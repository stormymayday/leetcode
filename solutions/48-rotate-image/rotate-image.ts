/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    // Transpose using the Top Right Half behind the diagonal
    for(let row = 0; row < ROWS - 1; row += 1) {
        for(let col = row + 1; col < COLS; col += 1) {
            // Swap
            const temp = matrix[row][col];
            matrix[row][col] = matrix[col][row];
            matrix[col][row] = temp;
        }
    }

    // Reverse all rows
    for(let row = 0; row < ROWS; row += 1) {
        reverse(matrix[row]);
    }
    
};

function reverse(arr: number[]): void {
    let left = 0;
    let right = arr.length - 1;
    while(left < right) {
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left += 1;
        right -= 1;
    }
}