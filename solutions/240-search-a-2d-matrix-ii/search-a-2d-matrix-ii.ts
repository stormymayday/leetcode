function searchMatrix(matrix: number[][], target: number): boolean {

    // Mid starts in the top right croner
    let row = 0;
    let col = matrix[0].length - 1;

    while(row < matrix.length && col >= 0) {

        if(matrix[row][col] === target) {
            return true;
        } else if(matrix[row][col] > target) {
            // need to reduce the col
            col -= 1;
        } else {
            // need to increase the row
            row += 1;
        }

    }

    return false;

};