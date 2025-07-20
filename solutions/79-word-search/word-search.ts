function exist(board: string[][], word: string): boolean {
    function helper(row: number, col: number, index: number, visited: Set<string>):boolean {
        if(index === word.length) {
            return true;
        }

        const rowInBounds = 0 <= row && row < board.length;
        const colInBounds = 0 <= col && col < board[0].length;
        if(!rowInBounds || !colInBounds) {
            return false;
        }

        if(board[row][col] !== word[index]) {
            return false;
        }

        const position = `${row},${col}`;
        if(visited.has(position)) {
            return false;
        }

        visited.add(position);

        const result = helper(row - 1, col, index + 1, visited) ||
            helper(row, col + 1, index + 1, visited) ||
            helper(row + 1, col, index + 1, visited) ||
            helper(row, col - 1, index + 1, visited);

        visited.delete(position);

        return result;
    }

    for(let row = 0; row < board.length; row += 1) {
        for(let col = 0; col < board[0].length; col += 1) {
            if(board[row][col] === word[0]) {
                if(helper(row, col, 0, new Set()) === true) {
                    return true;
                }
            }
        }
    }

    return false;
};