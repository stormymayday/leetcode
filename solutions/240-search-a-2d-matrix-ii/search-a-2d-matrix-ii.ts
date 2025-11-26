function searchMatrix(matrix: number[][], target: number): boolean {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    for(let row = 0; row < ROWS; row += 1) {

        if(matrix[row][0] <= target && target <= matrix[row][COLS - 1]) {
            
            let left = 0;
            let right = COLS - 1;

            while(left <= right) {

                const mid = left + Math.floor((right - left) / 2);

                if(matrix[row][mid] === target) {
                    return true;
                } else if(matrix[row][mid] > target) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }

            }

        }

    }

    return false;

};