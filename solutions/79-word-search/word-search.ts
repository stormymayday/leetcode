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

                if (backtrackDFS(row, col, board, word, 0, visited) === true) {
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
    word: string,
    idx: number,
    visited: boolean[][]
): boolean {

    // Base Case 1: Out of bounds
    if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return false;
    }

    // Base Case 2: Visited
    if(visited[row][col] === true) {
        return false;
    }

    // Base Case 3: Wrong character
    if(grid[row][col] !== word[idx]) {
        return false;
    }

    // Otherwise, this is a new positon
    visited[row][col] = true; // mark as 'visited'

    // Base Case 4: Word found (search complete)
    if(idx === word.length - 1) {
        return true;
    }

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for(const [rowDelta, colDelta] of directions) {
        if(backtrackDFS(row + rowDelta, col + colDelta, grid, word, idx + 1, visited) === true) {
            return true;
        }
    }

    // None of the directions were successfull, backtrack
    visited[row][col] = false;

    return false;

}