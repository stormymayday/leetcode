/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    const hashRows = new Array(ROWS).fill(1);
    const hashCols = new Array(COLS).fill(1);

    for(let row = 0; row < ROWS; row += 1) {
        for(let col = 0; col < COLS; col += 1) {
            if(matrix[row][col] === 0) {
                hashRows[row] = 0;
                hashCols[col] = 0;
            }
        }
    }

    for(let row = 0; row < ROWS; row += 1) {
        for(let col = 0; col < COLS; col += 1) {
            if(hashRows[row] === 0 || hashCols[col] === 0) {
                matrix[row][col] = 0
            }
        }
    }
    
};