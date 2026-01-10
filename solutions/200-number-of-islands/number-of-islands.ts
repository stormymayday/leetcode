function numIslands(grid: string[][]): number {
    
    const ROWS = grid.length;
    const COLS = grid[0].length;

    const visited: boolean[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }

    let count = 0;

    for(let row = 0; row < ROWS; row += 1) {
        for(let col = 0; col < COLS; col += 1) {

            if(grid[row][col] === '1' && visited[row][col] === false) {

                dfs(grid, ROWS, COLS, row, col, visited);

                count += 1;

            }

        }
    }

    return count;

};

function dfs(grid: string[][], numRows: number, numCols: number, row: number, col: number, visited: boolean[][]): void {

    // Base Case: out of bounds
    if(row < 0 || row >= numRows || col < 0 || col >= numCols) {
        return;
    }

    // Base Case: visited
    if(visited[row][col] === true) {
        return;
    }

    // Base Case: water
    if(grid[row][col] === '0') {
        return;
    }

    visited[row][col] = true;

    const directions: number[][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];

    for(const [rowDelta, colDelta] of directions) {

        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;

        dfs(grid, numRows, numCols, neighborRow, neighborCol, visited);

    }

}