function exist(board: string[][], word: string): boolean {
    for(let r = 0; r < board.length; r += 1) {
        for(let c = 0; c < board[0].length; c += 1) {
            if(dfs(board, r, c, 0, word, new Set()) === true) {
                return true;
            }
        }
    }
    return false;
};

function dfs(grid: string[][], r: number, c: number, index: number, word: string, visited: Set<string>):boolean {
    // Base Case 1: word found!
    if(index === word.length) {
        return true;
    }

    // Base Case 2: out of bounds
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    if(!rowInBounds || !colInBounds) {
        return false;
    }

    // Base Case 3: char mismatch
    if(grid[r][c] !== word[index]) {
        return false;
    }

    // Base Case 4: visited
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return false;
    }

    visited.add(position);

    const result = dfs(grid, r - 1, c, index + 1, word, visited) // up
        || dfs(grid, r + 1, c, index + 1, word, visited) // down
        || dfs(grid, r, c - 1, index + 1, word, visited) // left
        || dfs(grid, r, c + 1, index + 1, word, visited); // right

    // Backtrack
    visited.delete(position);

    return result;
}