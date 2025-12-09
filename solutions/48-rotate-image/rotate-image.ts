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

    // Fill out the copy using original row into copy column
    let copyCol = COLS - 1; // starting from the last column, going towards first
    for (let row = 0; row < ROWS; row += 1) {

        const currRow = matrix[row];

        // Going down row by row
        for (let rowIdx = 0; rowIdx < ROWS; rowIdx += 1) {

            copy[rowIdx][copyCol] = currRow[rowIdx];
            // Note: 'rowIdx' in currRow[rowIdx] is referencing a column index

        }

        // move to the next column
        copyCol -= 1;

    }

    // Overwrite the original using copy
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            matrix[row][col] = copy[row][col];
        }
    }
};