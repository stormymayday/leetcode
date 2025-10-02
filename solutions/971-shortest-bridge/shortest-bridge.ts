function shortestBridge(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    // matrix for marking position of the first island (needed for BFS) 
    // Never changes after DFS, always identifies first island
    const firstIslandPosition: boolean[][] = new Array(ROWS);
    for (let row = 0; row < ROWS; row += 1) {
        firstIslandPosition[row] = new Array(COLS).fill(false);
    }

    // matrix for marking visited cells in BFS (starts with firstIsland positions)
    // Tracks BFS exploration, grows during BFS
    const visited: boolean[][] = new Array(ROWS);
    for (let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }

    const firstIslandQueue: [number, number, number][] = []; // [row, col, distance]

    // 1. Scan grid a piece of land (fisrt island)
    outer: for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            // 1.1 When we find the first island, run dfs on it to mark it's coordinates in the 'firstIsland' matrix (queue as well?)
            if (grid[row][col] === 1) {
                matrixDFS(row, col, grid, firstIslandPosition, visited, firstIslandQueue);
                break outer;
            }
        }
    }

    // 2. Run BFS from the first island towards the secon island
    return matrixBFS(grid, firstIslandPosition, visited, firstIslandQueue);

};

function matrixDFS(
    row: number,
    col: number,
    grid: number[][],
    firstIslandPosition: boolean[][],
    visited: boolean[][],
    firstIslandQueue: [number, number, number][]
): void {

    // Base Case 1: out of bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return;
    }

    // Base Case 2: water
    if (grid[row][col] === 0) {
        return;
    }

    // Base Case 3: visited
    if (firstIslandPosition[row][col] === true) {
        return;
    }

    // Capturing coordinates and filling up the queue
    firstIslandPosition[row][col] = true;
    firstIslandQueue.push([row, col, 0]);
    visited[row][col] = true;

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for (const [rowDelta, colDelta] of directions) {
        matrixDFS(row + rowDelta, col + colDelta, grid, firstIslandPosition, visited, firstIslandQueue);
    }

    return;

}

function matrixBFS(
    grid: number[][],
    firstIslandPosition: boolean[][],
    visited: boolean[][],
    firstIslandQueue: [number, number, number][]
): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let queue: [number, number, number][] = firstIslandQueue;

    while (queue.length > 0) {

        const nextQueue: [number, number, number][] = [];
        for (let i = 0; i < queue.length; i += 1) {

            const [currRow, currCol, currDist] = queue[i];

            if (grid[currRow][currCol] === 1 && firstIslandPosition[currRow][currCol] === false) {
                return currDist - 1;
            }

            const directions: [number, number][] = [
                [-1, 0], // up
                [0, 1], // right
                [1, 0], // down
                [0, -1], // left
            ];
            for (const [rowDelta, colDelta] of directions) {

                const neighborRow = currRow + rowDelta;
                const neighborCol = currCol + colDelta;

                if (
                    // Out of bounds check
                    0 <= neighborRow && neighborRow < ROWS &&
                    0 <= neighborCol && neighborCol < COLS &&
                    // visited check
                    visited[neighborRow][neighborCol] === false
                ) {
                    visited[neighborRow][neighborCol] = true;
                    nextQueue.push([neighborRow, neighborCol, currDist + 1]);
                }

            }

        }
        if (nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return -1;

}