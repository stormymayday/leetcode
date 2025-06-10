class NumMatrix {
    sumMatrix: number[][];
    constructor(matrix: number[][]) {
        const ROWS = matrix.length;
        const COLS = matrix[0].length;
        this.sumMatrix = [];
        for(let i = 0; i < ROWS + 1; i += 1) {
            this.sumMatrix.push(new Array(COLS + 1).fill(0));
        }

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
        row1 += 1;
        row2 += 1;
        col1 += 1;
        col2 += 1;
        const bottomRight = this.sumMatrix[row2][col2];
        const above = this.sumMatrix[row1 - 1][col2];
        const left = this.sumMatrix[row2][col1 - 1];
        const topLeft = this.sumMatrix[row1 - 1][col1 - 1];
        return bottomRight - above - left + topLeft;
    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */