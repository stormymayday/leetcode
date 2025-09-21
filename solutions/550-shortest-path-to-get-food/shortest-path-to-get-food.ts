function getFood(grid: string[][]): number {
    
    const ROWS = grid.length;
    const COLS = grid[0].length;

    let minDist = -1;
    for(let row = 0; row < ROWS; row += 1) {
        for(let col = 0; col < COLS; col += 1) {
            if(grid[row][col] === "*") {
                minDist = matrixBFS(row, col, grid);
            }
        }
    }
    return minDist;
};

function matrixBFS(row: number, col: number, grid: string[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let queue: [number, number, number][] = [];
    queue.push([row, col, 0]);

    const visited: boolean[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }
    visited[row][col] = true;

    while(queue.length > 0) {

        const newQueue: [number, number, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currRow, currCol, currDist] = queue[i];

            if(grid[currRow][currCol] === '#') {
                return currDist;
            }

            const directions: [number, number][] = [
                [-1, 0], // up
                [0, 1], // right
                [1, 0], // down
                [0, -1], // left
            ];
            for(const [rowDelta, colDelta] of directions) {
                const neighborRow = currRow + rowDelta;
                const neighborCol = currCol + colDelta;
                if(
                    // out of bounds check
                    0 <= neighborRow && neighborRow < ROWS &&
                    0 <= neighborCol && neighborCol < COLS &&
                    // visited check
                    visited[neighborRow][neighborCol] === false &&
                    // obstacle
                    grid[neighborRow][neighborCol] !== 'X'
                ) {
                    visited[neighborRow][neighborCol] = true;
                    newQueue.push([neighborRow, neighborCol, currDist + 1]);
                }
            }

        }

        if(newQueue.length > 0) {
            queue = newQueue;
        } else {
            break;
        }

    }

    return -1;
}