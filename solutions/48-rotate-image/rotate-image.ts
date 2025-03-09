/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {

    // storing matrix length
    const n = matrix.length;

    // Process layer by layer from outside to inside
    for(let layer = 0; layer < Math.floor(n / 2); layer++) {

        // boundaries for current layer
        let topRow = layer
        let rightCol = n - 1 - layer;
        let bottomRow = n - 1 - layer;
        let leftCol = layer;

        // For each element in the current layer
        for(let i = 0; i < rightCol - leftCol; i++) {
            // TEMP VARS
            // Storing all four elements that will be rotated
            let currentTopRowElement = matrix[topRow][leftCol + i];
            let currentRightColElement = matrix[topRow + i][rightCol];
            let currentBottomRowElement = matrix[bottomRow][rightCol - i];
            let currentLeftColElement = matrix[bottomRow - i][leftCol];

            // SWAPPING
            // top row goes into right col
            matrix[topRow + i][rightCol] = currentTopRowElement;
            // right col goes into bottom row
            matrix[bottomRow][rightCol - i] = currentRightColElement;
            // bottom row goes into left col
            matrix[bottomRow - i][leftCol] = currentBottomRowElement;
            // left col goes into tio row
            matrix[topRow][leftCol + i] = currentLeftColElement

        }

    }
    
};