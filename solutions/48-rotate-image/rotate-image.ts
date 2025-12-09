/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    // Create a copy
    const copy = new Array(ROWS);
    for (let row = 0; row < ROWS; row += 1) {
        copy[row] = new Array(COLS);
    }

    for(let row = 0; row < ROWS; row += 1) {
        for(let col = 0; col < COLS; col += 1) {
            
            // original - col is dynamic, therefore, reference can copy - row

            // original - row is static


            copy[col][matrix.length - 1 - row] = matrix[row][col];

        }
    }

    // Overwrite the original using copy
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            matrix[row][col] = copy[row][col];
        }
    }
};