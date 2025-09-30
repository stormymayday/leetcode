function numIslands(grid: string[][]): number {
    
    const ROWS = grid.length;
    const COLS = grid[0].length;

    const visited: boolean[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }

    let numIslands = 0;
    for(let row = 0; row < ROWS; row += 1) {
        for(let col = 0; col < COLS; col += 1) {
            if(grid[row][col] === '1' && visited[row][col] === false) {
                numIslands += 1;
                matrixDFS(row, col, grid, visited);
            }
        }
    }
    return numIslands;

};

function matrixDFS(row: number, col: number, grid: string[][], visited: boolean[][]): void {

    // Base Case: Out of bounds check
    if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
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

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for(const [rowDelta, colDelta] of directions) {
        matrixDFS(row + rowDelta, col + colDelta, grid, visited);
    }

    return;

}