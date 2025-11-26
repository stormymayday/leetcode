function searchMatrix(matrix: number[][], target: number): boolean {

    // Mid starts in the top right croner
    let row = matrix.length - 1;
    let col = 0;

    while(row >= 0 && col <= matrix[0].length - 1) {

        if(matrix[row][col] === target) {
            return true;
        } else if(matrix[row][col] > target) {
            // need to REDUCE the row
            row -= 1;
        } 
        // target is larget than 'mid'
        else {
            // need to INCREASE the COL
            col += 1;
        }

    }

    return false;

};