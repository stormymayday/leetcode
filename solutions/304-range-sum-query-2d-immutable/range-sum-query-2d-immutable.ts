class NumMatrix {
    sumMatrix: number[][];
    constructor(matrix: number[][]) {
        const ROWS = matrix.length;
        const COLS = matrix[0].length;
        this.sumMatrix = [];
        // creating the sumMatrix
        for(let i = 0; i < ROWS + 1; i += 1) {
            this.sumMatrix.push(new Array(COLS + 1).fill(0));
        }
        // filling the sumMatrix
        for(let r = 0; r < ROWS; r += 1) {
            let prefixSum = 0;
            for(let c = 0; c < COLS; c += 1) {
                prefixSum += matrix[r][c];
                const above = this.sumMatrix[r][c + 1];
                this.sumMatrix[r + 1][c + 1] = prefixSum + above;
            }
        }
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        const bottomRight = this.sumMatrix[row2 + 1][col2 + 1];
        const above = this.sumMatrix[row1][col2 + 1];
        const left = this.sumMatrix[row2 + 1][col1];
        const topLeft = this.sumMatrix[row1][col1];
        return bottomRight - above - left + topLeft;
    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */