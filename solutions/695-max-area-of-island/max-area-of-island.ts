function maxAreaOfIsland(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    const visited: boolean[][] = new Array(ROWS);
    for (let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }

    let largest = 0;
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (grid[row][col] === 1 && visited[row][col] === false) {
                largest = Math.max(largest, matrixDFS(row, col, grid, visited));
            }
        }
    }
    return largest;

};

function matrixDFS(row: number, col: number, grid: number[][], visited: boolean[][]): number {

    // Base Case 1: out of bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return 0;
    }

    // Base Case 2: visited
    if (visited[row][col] === true) {
        return 0;
    }

    // Base Case 3: water
    if (grid[row][col] === 0) {
        return 0;
    }

    visited[row][col] = true;

    let size = 1;
    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for (const [rowDelta, colDelta] of directions) {
        size += matrixDFS(row + rowDelta, col + colDelta, grid, visited);
    }

    return size;

}