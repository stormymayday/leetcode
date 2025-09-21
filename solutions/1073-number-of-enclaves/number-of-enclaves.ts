function numEnclaves(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    const gridCopy: number[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        gridCopy[row] = [...grid[row]];
    }

    // Phase 1: go around the edges and DFS on '1's, flipping all water adjacent land to '2's
    for(let col = 0; col < COLS; col += 1) {
        // Top Row
        if(gridCopy[0][col] === 1) {
            matrixDFS(0, col, gridCopy);
        }
        // Bottom Row
        if(gridCopy[ROWS - 1][col] === 1) {
            matrixDFS(ROWS - 1, col, gridCopy);
        }
    }
    for(let row = 0; row < ROWS; row += 1) {
        // Left Col
        if(gridCopy[row][0] === 1) {
            matrixDFS(row, 0, gridCopy);
        }
        // Right Col
        if(gridCopy[row][COLS - 1] === 1) {
            matrixDFS(row, COLS - 1, gridCopy);
        }
    }

    // Phase 2: scan the grid and count number of '1's remaining
    let res: number = 0;
    for(let row = 1; row < ROWS; row += 1) {
        for(let col = 1; col < COLS; col += 1) {
            if(gridCopy[row][col] === 1) {
                res += 1;
            }
        }
    }
    return res;
    
};

function matrixDFS(row: number, col: number, grid: number[][]): void {
    // Base case: out of bounds
    if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return;
    }

    // Base case: not 1 (can be 0 or 2)
    if(grid[row][col] !== 1) {
        return;
    }

    grid[row][col] = 2;

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for(const [rowDelta, colDelta] of directions) {
        matrixDFS(row + rowDelta, col + colDelta, grid);
    }
}