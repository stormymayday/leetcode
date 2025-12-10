class NumMatrix {

    prefixSums2D: number[][];

    constructor(matrix: number[][]) {

        this.prefixSums2D = new Array(matrix.length);

        for (let row = 0; row < matrix.length; row += 1) {

            this.prefixSums2D[row] = new Array(matrix[0].length);

            for (let col = 0; col < matrix[0].length; col += 1) {

                // 1. Use the original value
                this.prefixSums2D[row][col] = matrix[row][col];

                // 2. If there is a row above, add value of the cell above
                if (row > 0) {
                    this.prefixSums2D[row][col] += this.prefixSums2D[row - 1][col];
                }

                // 3. If there is a col to the left, add value of the cell to the left
                if (col > 0) {
                    this.prefixSums2D[row][col] += this.prefixSums2D[row][col - 1];
                }

                // 4. If there is a row and col above
                if (col > 0 && row > 0) {
                    // Subtract the overlapping top-left region that was counted twice
                    this.prefixSums2D[row][col] -= this.prefixSums2D[row - 1][col - 1];
                }

            }

        }

    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {

        // Edge Case 1: There is no row above and no column to the left
        if (row1 === 0 && col1 === 0) {
            return this.prefixSums2D[row2][col2];
        }
        // Edge Case 2: There is no row above
        else if (row1 === 0) {
            return this.prefixSums2D[row2][col2] - this.prefixSums2D[row2][col1 - 1];
        }
        // Edge Case 3: There is no col to the left
        else if (col1 === 0) {
            return this.prefixSums2D[row2][col2] - this.prefixSums2D[row1 - 1][col2];
        }
        // There is a row above and col to the left
        else {
            return this.prefixSums2D[row2][col2] -
                // Subtract from the row above 
                this.prefixSums2D[row1 - 1][col2] -
                // Subtract from col to th left
                this.prefixSums2D[row2][col1 - 1] +
                // Add the top-left diagonal
                this.prefixSums2D[row1 - 1][col1 - 1];
        }

    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */