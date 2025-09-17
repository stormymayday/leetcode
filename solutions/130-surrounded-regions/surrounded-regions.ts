/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {

    const ROWS = board.length;
    const COLS = board[0].length;

    const visited = new Set<string>();

    // Pass 1: Go over Top & Bottom Rows running dfs Flipping 'O's to 'T's
    for (let col = 0; col < COLS; col += 1) {
        // Top Row
        if (!visited.has(`${0},${col}`)) {
            matrixDFS(0, col, board, visited);
        }
        // Bottom Row
        if (!visited.has(`${ROWS - 1},${col}`)) {
            matrixDFS(ROWS - 1, col, board, visited);
        }
    }

    // Pass 2: Go over Left & Right Cols running dfs Flipping 'O's to 'T's
    for (let row = 0; row < ROWS; row += 1) {
        // Left Col
        if (!visited.has(`${row},${0}`)) {
            matrixDFS(row, 0, board, visited);
        }
        // Right Col
        if (!visited.has(`${row},${COLS - 1}`)) {
            matrixDFS(row, COLS - 1, board, visited);
        }
    }

    // Pass 3: Capturing Surrounded Regions - Flip all 'O's to 'X's
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (board[row][col] === 'O') {
                board[row][col] = 'X';
            }
        }
    }

    // Pass 4: Resetting Border Regions - Flip all 'T's to 'O's
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (board[row][col] === 'T') {
                board[row][col] = 'O';
            }
        }
    }

};

function matrixDFS(row: number, col: number, grid: string[][], visited: Set<string>): void {

    // Base Case 1: Out of bounds
    if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return;
    }

    // Base Case 2: visited
    if(visited.has(`${row},${col}`)) {
        return;
    }

    // Base Case 3: 'X' or 'T'
    if(grid[row][col] === 'X' || grid[row][col] === 'T') {
        return;
    }

    // Recursive Step
    visited.add(`${row},${col}`);
    grid[row][col] = 'T';
    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for(const [rowDelta, colDelta] of directions) {
        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;
        if(!visited.has(`${neighborRow},${neighborCol}`)) {
            matrixDFS(neighborRow, neighborCol, grid, visited);
        }
    }
}