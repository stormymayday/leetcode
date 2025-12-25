function isValidSudoku(board: string[][]): boolean {

    // Phase 1: Rows & Cols
    for (let i = 0; i < 9; i += 1) {

        // rows
        const rowSet = new Set<string>();
        for (let col = 0; col < 9; col += 1) {

            if (board[i][col] !== '.') {
                if (rowSet.has(board[i][col])) {
                    return false;
                }
                rowSet.add(board[i][col]);
            }

        }

        // cols
        const colSet = new Set<string>();
        for (let row = 0; row < 9; row += 1) {
            if (board[row][i] !== '.') {
                if (colSet.has(board[row][i])) {
                    return false;
                }
                colSet.add(board[row][i]);
            }

        }

        // Phase 2: Sub-Grids
        const gridSet = new Set<string>();
        for (let row = 0; row < 3; row += 1) {
            for (let col = 0; col < 3; col += 1) {
                let r = Math.floor(i / 3) * 3 + row;
                let c = (i % 3) * 3 + col;
                if (board[r][c] !== '.') {
                    if (gridSet.has(board[r][c])) {
                        return false;
                    }
                    gridSet.add(board[r][c]);
                }

            }
        }

    }


    return true;

};