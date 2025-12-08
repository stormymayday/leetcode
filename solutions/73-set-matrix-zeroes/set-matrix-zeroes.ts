/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    const rowSet = new Set<number>();
    const colSet = new Set<number>();

    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (matrix[row][col] === 0) {
                rowSet.add(row);
                colSet.add(col);
            }
        }
    }

    // for (const row of rowSet) {
    //     for (let col = 0; col < COLS; col += 1) {
    //         matrix[row][col] = 0;
    //     }
    // }

    // for (const col of colSet) {
    //     for (let row = 0; row < ROWS; row += 1) {
    //         matrix[row][col] = 0;
    //     }
    // }

    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (rowSet.has(row) || colSet.has(col)) {
                matrix[row][col] = 0;
            }
        }
    }

};