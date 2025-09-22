function closedIsland(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;
    
    const gridCopy: number[][] = new Array(ROWS);
    // const visited: boolean[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        gridCopy[row] = [...grid[row]];
        // visited[row] = new Array(COLS).fill(false);
    }

    // Phase 1: Go around the edges running DFS on '0's flipping them to '2's
    for(let col = 0; col < COLS; col += 1) {
        // Top Row
        if(gridCopy[0][col] === 0) {
            flipZeroes(0, col, gridCopy);
        }
        // Bottom Row
        if(gridCopy[ROWS - 1][col] === 0) {
            flipZeroes(ROWS - 1, col, gridCopy);
        }
    }
    for(let row = 0; row < ROWS; row += 1) {
        // Left Col
        if(gridCopy[row][0] === 0) {
            flipZeroes(row, 0, gridCopy);
        }
        // Right Col
        if(gridCopy[row][COLS - 1] === 0) {
            flipZeroes(row, COLS - 1, gridCopy);
        }
    }

    // Phase 2: Scan the matrix for remaining '0's counting number of islands
    let res: number = 0;
    // can skip first and last row
    for(let row = 1; row < ROWS - 1; row += 1) {
        // can skip first and last col
        for(let col = 1; col < COLS - 1; col += 1) {
            if(gridCopy[row][col] === 0) {
                flipZeroes(row, col, gridCopy);
                res += 1;
            }
        }
    }
    return res;
};

function flipZeroes(row: number, col: number, grid: number[][]): void {
    // Base Case 1: out of bounds
    if(row < 0 || row >= grid.length || col < 0 || col > grid[0].length) {
        return;
    }

    // Base Case 2: not 0 (skipping 1s and 2s)
    if(grid[row][col] !== 0) {
        return;
    }

    // Flip Zero
    grid[row][col] = 2;

    // Recurse in 4 directions
    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for(const [rowDelta, colDelta] of directions) {
        flipZeroes(row + rowDelta, col + colDelta, grid);
    }
}