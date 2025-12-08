/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    let firstRow = 1; // to mark first row
    let firstCol = 1; // to mark first column

    // O(ROWS * COLS) - scan entire matrix to mark zeros
    // Uses first row and first column as markers
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (matrix[row][col] === 0) {

                // First Column Edge Case
                if (col === 0) {
                    // Entire first column will have to be overwritten
                    firstCol = 0;
                } else {
                    // Using First Row to mark the columns
                    matrix[0][col] = 0;
                }

                // First Row Edge Case
                if (row === 0) {
                    // Entire first row will have to be overwritten
                    firstRow = 0;
                } else {
                    // Using First Column to mark the rows
                    matrix[row][0] = 0;
                }

            }
        }
    }


    // O(ROWS * COLS) - process all cells except first row/col
    // Note: moving top down can overwrite "markings"
    // Skipping first row & col
    for (let row = 1; row < ROWS; row += 1) {
        for (let col = 1; col < COLS; col += 1) {
            if (matrix[0][col] === 0 || matrix[row][0] === 0) {
                matrix[row][col] = 0;
            }
        }
    }

    // O(COLS) - zero out first row if needed
    // First Row was "marked"
    if(firstRow === 0) {
        for(let col = 0; col < COLS; col += 1) {
            matrix[0][col] = 0;
        }
    }

    // O(ROWS) - zero out first column if needed
    // First Col was "Marked"
    if(firstCol === 0) {
        for(let row = 0; row < ROWS; row += 1) {
            matrix[row][0] = 0;
        }
    }

    // Overall Time Complexity: O(ROWS * COLS)
    // Overall Space Complexity: O(1) - constant space! (only 2 variables)

};