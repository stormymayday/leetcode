function findDiagonalOrder(mat: number[][]): number[] {

    const ROWS = mat.length;
    const COLS = mat[0].length;

    const res: number[] = new Array(ROWS * COLS);
    let idx = 0;

    for(let diag = 0; diag < ROWS + COLS - 1; diag += 1) {

        const temp: number[] = [];

        // Starting Points
        // While current diagonal is smaller than the number of COLS, row stays at index 0. Otherwise (equals or greater), row starts moving down.
        let row = diag < COLS ? 0 : diag - COLS + 1; // Carefull off by one error!
        // While current diagonal is smaller than the number of COLS, col moves with the diagonal. Otherwise (quals or greater), it stays at the last index.
        let col = diag < COLS ? diag : COLS - 1;  // Carefull off by one error!

        // Reading values from the current diagonal (top -> down, right -> left):
        // - row is increasing
        // - col is decreasing
        while(
            row < ROWS &&
            col >= 0
        ) {

            temp.push(mat[row][col]);

            row += 1;
            col -= 1;

        }

        // Reversing even indexed diagonals
        if(diag % 2 === 0) {
            temp.reverse();
        }

        // Writing into the result (using the 'idx')
        for(let i = 0; i < temp.length; i+= 1) {
            res[idx] = temp[i];
            idx += 1;
        }

    }

    return res;
    
};