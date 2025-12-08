/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    // to mark columns (first column)
    let firstRow = 1;
    let firstCol = 1;

    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (matrix[row][col] === 0) {

                // Top Left Edge Case
                if (col === 0) {
                    // Entire first column will have to be overwritten
                    firstCol = 0;
                } else {
                    // Using First Row to mark the columns
                    matrix[0][col] = 0;
                }

                if (row === 0) {
                    firstRow = 0;
                } else {
                    // Using First Column to mark the rows
                    matrix[row][0] = 0;
                }

            }
        }
    }

    // Now First Row & Col are "technically" marked / overwritten
    // Note: moving top down can overwrite "markings"

    // Skipping first row & col
    for (let row = 1; row < ROWS; row += 1) {
        for (let col = 1; col < COLS; col += 1) {
            if (matrix[0][col] === 0 || matrix[row][0] === 0) {
                matrix[row][col] = 0;
            }
        }
    }


    if(firstRow === 0) {
        for(let col = 0; col < COLS; col += 1) {
            matrix[0][col] = 0;
        }
    }

    if(firstCol === 0) {
        for(let row = 0; row < ROWS; row += 1) {
            matrix[row][0] = 0;
        }
    }

};