function largestIsland(grid: number[][]): number {

    const n = grid.length;

    // 1. DFS the matrix finding each island, labeling it and recording it's size
    const islandToSize = new Map<number, number>(); // key: islandId, value: size
    const visited: boolean[][] = new Array(n);
    let islandId = 2; // starting with ID of 2
    for (let i = 0; i < n; i += 1) {
        visited[i] = new Array(n).fill(false);
    }
    for (let row = 0; row < n; row += 1) {
        for (let col = 0; col < n; col += 1) {
            if (grid[row][col] === 1 && visited[row][col] === false) {
                islandToSize.set(islandId, matrixDFS(row, col, grid, islandId, visited));
                islandId += 1;
            }
        }
    }

    // Edge Case: no islands were found (entire grid is water)
    if (islandToSize.size === 0) {
        return 1; // Can only flip one zero
    }

    // Edge Case: entire grid is one island
    if (islandToSize.size === 1 && islandToSize.get(2) === n * n) {
        return islandToSize.get(2);
    }

    // 2. Making A Large Island
    let largest = 1; // to track max (combined) island size
    for (let row = 0; row < n; row += 1) {
        for (let col = 0; col < n; col += 1) {
            if (grid[row][col] === 0) {
                const usedIslands = new Set<number>(); // to avoid re-adding an island
                let currentLargest = 1; // flipping 0 to 1
                // check all directions for islands and add their size
                const directions: [number, number][] = [
                    [-1, 0], // up
                    [0, 1], // right
                    [1, 0], // down
                    [0, -1], // left
                ];
                for (const [rowDelta, colDelta] of directions) {
                    const neighborRow = row + rowDelta;
                    const neighborCol = col + colDelta;
                    if (
                        // out of bounds check
                        0 <= neighborRow && neighborRow < n &&
                        0 <= neighborCol && neighborCol < n &&
                        // island check
                        grid[neighborRow][neighborCol] !== 0 &&
                        // used island check
                        !usedIslands.has(grid[neighborRow][neighborCol])
                    ) {
                        usedIslands.add(grid[neighborRow][neighborCol]);
                        currentLargest += islandToSize.get(grid[neighborRow][neighborCol]);
                    }
                }
                largest = Math.max(largest, currentLargest);
            }
        }
    }
    return largest;
};

function matrixDFS(row: number, col: number, grid: number[][], islandId: number, visited: boolean[][]): number {

    // Base Case 1: Out of bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return 0;
    }

    // Base Case 2: visited
    if (visited[row][col] === true) {
        return 0;
    }

    // Base Case 3: not a land
    if (grid[row][col] !== 1) {
        return 0;
    }

    // Recursive Step
    visited[row][col] = true; // mark cell as visited
    grid[row][col] = islandId; // change cell value to islandId
    let area = 1; // counting current land cell
    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for (const [rowDelta, colDelta] of directions) {
        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;
        area += matrixDFS(neighborRow, neighborCol, grid, islandId, visited);
    }
    return area;
}