function findDiagonalOrder(mat: number[][]): number[] {

    const ROWS: number = mat.length;
    const COLS: number = mat[0].length;

    const res: number[] = new Array(ROWS * COLS);
    let idx: number = 0;

    for (let diag = 0; diag < ROWS + COLS - 1; diag += 1) {
        // even diagonal index - going up -> right
        if (diag % 2 === 0) {

            // Starting row & col (start from bottom-left of diagonal)
            // Even diagonals: Compare diag with ROWS (we're moving down the left edge first)
            let row = diag < ROWS ? diag : ROWS - 1;
            let col = diag < ROWS ? 0 : diag - ROWS + 1;

            // row decreases and col increases
            while (row >= 0 && col < COLS) {
                res[idx] = mat[row][col];
                row -= 1;
                col += 1;
                idx += 1;
            }

        } 
        // odd numbered diagonal  (going down-left)
        else {
            
            // Starting row & col (start from top-right of diagonal)
            // Odd diagonals: Compare diag with COLS (we're moving across the top edge first)
            let row = diag < COLS ? 0 : diag - COLS + 1;
            let col = diag < COLS ? diag : COLS - 1;

            // row increases and col decreases
            while (row < ROWS && col >= 0) {
                // Reading diagonal & Writing result
                res[idx] = mat[row][col];
                row += 1;
                col -= 1;
                idx += 1;
            }

        }

    }

    return res;

};