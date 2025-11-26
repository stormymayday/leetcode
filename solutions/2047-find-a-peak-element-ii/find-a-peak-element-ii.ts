function findPeakGrid(mat: number[][]): number[] {

    for(let row = 0; row < mat.length; row += 1) {
        for(let col = 0; col < mat[0].length; col += 1) {
            if(isPeak(mat, row, col) === true) {
                return [row, col];
            }
        }
    }

    // if matrix is empty
    return [-1, -1];

};

function isPeak(matrix: number[][], row: number, col: number): boolean {
    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for(const [rowDelta, colDelta] of directions) {

        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;

        // if neighbor coordiantes are out of bounds, we default to -1
        let neighborVal = -1;
        // Otherwise, we use neighbor's value
        if( 
            // out of bounds check
            neighborRow >= 0 && neighborRow < matrix.length &&
            neighborCol >= 0 && neighborCol < matrix[0].length
        ) {
            neighborVal = matrix[neighborRow][neighborCol]
        }

        // value at given coords is smaller than atleast one of it's neighbors
        if(matrix[row][col] < neighborVal) {
            return false; // it's not a peak
        }
    }
    // If loop finishes, value at given coords is greater than values of all it's neighbors
    return true; // it's a peak
}