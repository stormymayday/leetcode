function findPeakGrid(mat: number[][]): number[] {

    const ROWS = mat.length;
    const COLS = mat[0].length;

    let left = 0; // first column
    let right = COLS - 1; // last column

    while (left <= right) {

        // mid column
        const midCol = left + Math.floor((right - left) / 2);

        // need to get highest value at the mid column
        // binary search? no, it's not sorted?
        // Linear scan across the column
        let row = 0; // starting from the top
        let maxVal = mat[row][midCol];
        for (let r = 1; r < ROWS; r += 1) {
            if (maxVal < mat[r][midCol]) {
                maxVal = mat[r][midCol];
                row = r;
            }
        }

        // this max is guaranteed to be greater than it's top and bottom
        // Therefore, need to check only vs left and right (cols)
        if (
            mat[row][midCol] > (midCol - 1 >= 0 ? mat[row][midCol - 1] : -1) &&
            mat[row][midCol] > (midCol + 1 < COLS ? mat[row][midCol + 1] : -1)
        ) {
            // if value is peak, return here
            return [row, midCol];
        } 
        else if (mat[row][midCol] < (midCol - 1 >= 0 ? mat[row][midCol - 1] : -1)) {
            // if left is greater, discard right and go left
            right = midCol - 1;
        } else {
            // otherwise, discard left and go right
            left = midCol + 1;
        }

    }

    // if matrix is empty
    return [-1, -1];

};