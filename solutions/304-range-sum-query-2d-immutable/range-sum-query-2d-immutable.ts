class NumMatrix {
    grid: number[][];
    constructor(matrix: number[][]) {
        this.grid = [];
        for(let row = 0; row < matrix.length; row += 1) {
            this.grid.push([...matrix[row]]);
        }
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        
        let sum = 0;

        for(let row = row1; row <= row2; row += 1) {
            for(let col = col1; col <= col2; col += 1) {
                sum += this.grid[row][col];
            }
        }

        return sum;

    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */