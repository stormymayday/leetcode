function exist(board: string[][], word: string): boolean {

  for(let row = 0; row < board.length; row += 1) {
    for(let col = 0; col < board[0].length; col += 1) {
        if(board[row][col] === word[0]) {
            if(dfs(board, row, col, 0, word, new Set<string>()) === true) {
                return true;
            }
        }
    }
  }
  return false;

};


function dfs(board: string[][], row: number, col: number, idx: number, word: string, visited: Set<string>): boolean {

    // Base Case: out of bounds
    if(row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
        return false;
    }

    // Base Case: visited
    const position = `${row},${col}`;
    if(visited.has(position)) {
        return false;
    }

    // Base Case: character missmatch
    if(board[row][col] !== word[idx]) {
        return false;
    }

    // Base Case: index is at the last character
    // since previous base case checks whether if characters match
    // this means that characters match and we are on the last character
    if(idx === word.length - 1) {
        return true;
    }

    visited.add(position);
    
    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1] // left
    ];
    for(const [rowDelta, colDelta] of directions) {
        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;
        if(dfs(board, neighborRow, neighborCol, idx + 1, word, visited) === true) {
            return true;
        }
    }

    // backtrack
    visited.delete(position);
    return false; // not found
}