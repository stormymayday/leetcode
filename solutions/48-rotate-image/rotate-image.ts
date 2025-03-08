/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    const length = matrix.length;

    // Step 1: Transpose the matrix
    for (let row = 0; row < length; row++) {
        for (let col = row; col < length; col++) {
            const temp = matrix[row][col];
            matrix[row][col] = matrix[col][row];
            matrix[col][row] = temp;
        }
    }

    // Step 2: Horizontal Reflection
    for (let row = 0; row < length; row++) {
        for (let col = 0; col < Math.floor(length / 2); col++) {
            const temp = matrix[row][col];
            matrix[row][col] = matrix[row][length - col - 1];
            matrix[row][length - col - 1] = temp;
        }
    }
}
