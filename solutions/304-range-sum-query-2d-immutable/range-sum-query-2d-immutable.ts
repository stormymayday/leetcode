class NumMatrix {

    prefixSums: number[][];

    constructor(matrix: number[][]) {

        const ROWS = matrix.length;
        const COLS = matrix[0].length;

        this.prefixSums = new Array(ROWS + 1);
        for (let row = 0; row < ROWS + 1; row += 1) {
            this.prefixSums[row] = new Array(COLS + 1).fill(0);
        }

        for (let row = 0; row < ROWS; row += 1) {
            for (let col = 0; col < COLS; col += 1) {
                this.prefixSums[row + 1][col + 1] =
                    matrix[row][col] +
                    this.prefixSums[row][col + 1] +
                    this.prefixSums[row + 1][col] -
                    this.prefixSums[row][col];
            }
        }

    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        return this.prefixSums[row2 + 1][col2 + 1] -
            this.prefixSums[row2 + 1][col1] -
            this.prefixSums[row1][col2 + 1] +
            this.prefixSums[row1][col1];

    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */