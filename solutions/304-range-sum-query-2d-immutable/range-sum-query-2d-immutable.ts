class NumMatrix {
    prefixSums1D: number[][];
    constructor(matrix: number[][]) {
        this.prefixSums1D = new Array(matrix.length);
        let prefixSum = 0;
        for(let row = 0; row < matrix.length; row += 1) {
            this.prefixSums1D[row] = new Array(matrix[0].length);
            for(let col = 0; col < matrix[0].length; col += 1) {
                prefixSum += matrix[row][col];
                this.prefixSums1D[row][col] = prefixSum;
            }
        }
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        
        let sum = 0;

        for(let row = row1; row <= row2; row += 1) {
            
            const rightSum = this.prefixSums1D[row][col2];
            let leftSum = 0;
            // Edge Case 1: The sub-matrix starts at first row and first col
            if(row === 0 && col1 === 0) {
                leftSum = 0;
            } 
            // Edge Case2 : col1 is 0
            // Then the 'leftSum' will 'wrap around' to the last column one row above
            else if(col1 === 0) {
                leftSum = this.prefixSums1D[row - 1][this.prefixSums1D[0].length - 1];
            } else {
                leftSum = this.prefixSums1D[row][col1 - 1];
            }

            sum += rightSum - leftSum;
            
        }

        return sum;

    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */