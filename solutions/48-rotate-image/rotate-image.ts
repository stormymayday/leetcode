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

        // Going row by row
        const currRow = matrix[row];

        for (let copyRow = 0; copyRow < ROWS; copyRow += 1) {

            copy[copyRow][copyCol] = currRow[copyRow];

        }

        copyCol -= 1;

    }

    // Overwrite the original using copy
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            matrix[row][col] = copy[row][col];
        }
    }
};