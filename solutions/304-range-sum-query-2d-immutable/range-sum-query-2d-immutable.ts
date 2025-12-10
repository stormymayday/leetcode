class NumMatrix {

    prefixSums2D: number[][];

    constructor(matrix: number[][]) {
        // Plus "Padding" Row of zeroes
        this.prefixSums2D = new Array(matrix.length + 1);
        for (let row = 0; row < matrix.length + 1; row += 1) {
            // Pluse "Padding" Col of zeroes
            this.prefixSums2D[row] = new Array(matrix[0].length + 1).fill(0);
        }

        for (let row = 0; row < matrix.length; row += 1) {

            for (let col = 0; col < matrix[0].length; col += 1) {

                // 1. Use the original value
                this.prefixSums2D[row + 1][col + 1] = matrix[row][col];

                // 2. Add the cell on top
                this.prefixSums2D[row + 1][col + 1] += this.prefixSums2D[row][col + 1];

                // 3. Add the cell to the left
                this.prefixSums2D[row + 1][col + 1] += this.prefixSums2D[row + 1][col];

                // Subtract the overlapping top-left region that was counted twice
                this.prefixSums2D[row + 1][col + 1] -= this.prefixSums2D[row][col];

            }

        }

    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {

        // Note: using "Padding" Row & Col

        return this.prefixSums2D[row2 + 1][col2 + 1] -
            // Subtract from the row above 
            this.prefixSums2D[row1][col2 + 1] -
            // Subtract from col to th left
            this.prefixSums2D[row2 + 1][col1] +
            // Add the top-left diagonal
            this.prefixSums2D[row1][col1];

    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */