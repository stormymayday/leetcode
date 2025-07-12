function exist(board: string[][], word: string): boolean {
    for(let r = 0; r < board.length; r += 1) {
        for(let c = 0; c < board[0].length; c += 1) {
            if(board[r][c] === word[0]) {
                if(dfs(board, r, c, 0, word) === true) {
                    return true;
                }
            }
        }
    }
    return false;
};

function dfs(grid: string[][], r: number, c: number, index: number, word: string):boolean {
    // Base Case: word found
    if(index === word.length) {
        return true;
    }

    // Base Case: out of bounds
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    if(!rowInBounds || !colInBounds) {
        return false;
    }

    // Base Case: char mismatch
    if(grid[r][c] !== word[index]) {
        return false;
    }

    // Base Case: visited
    if(grid[r][c] === '*') {
        return false;
    }

    const char = grid[r][c];
    grid[r][c] = '*';

    const result = dfs(grid, r - 1, c, index + 1, word) ||
        dfs(grid, r + 1, c, index + 1, word) ||
        dfs(grid, r, c - 1, index + 1, word) ||
        dfs(grid, r, c + 1, index + 1, word);

    // Backtrack
    grid[r][c] = char;

    return result;
} 