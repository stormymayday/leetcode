function exist(board: string[][], word: string): boolean {

    const ROWS = board.length;
    const COLS = board[0].length;

    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (board[row][col] === word[0]) {
                const visited: boolean[][] = new Array(ROWS);
                for (let row = 0; row < ROWS; row += 1) {
                    visited[row] = new Array(COLS).fill(false);
                }
                if (backtrackDFS(row, col, board, visited, [], word) === true) {
                    return true;
                }
            }
        }
    }

    return false;

};

function backtrackDFS(
    row: number,
    col: number,
    grid: string[][],
    visited: boolean[][],
    path: string[],
    word: string,
): boolean {

    // Base Case 1: Out of bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return false;
    }

    // Base Case 2: visited
    if (visited[row][col] === true) {
        return false;
    }

    // Base Case 3: Wrong letter
    if (grid[row][col] !== word[path.length]) {
        return false;
    }

    // Add current cell to path AFTER validation
    path.push(grid[row][col]);

    // Base Case 4: word is found
    if (path.length === word.length) {
        return true;
    }

    // Marking position as 'visited'
    visited[row][col] = true;

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for (const [rowDelta, colDelta] of directions) {

        if (backtrackDFS(row + rowDelta, col + colDelta, grid, visited, path, word) === true) {
            return true; // Early return when word is found
        }

    }

    // Backtrack after trying all directions
    path.pop();
    visited[row][col] = false;

    return false;

}