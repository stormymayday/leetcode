function searchMatrix(matrix: number[][], target: number): boolean {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    let left = 0;
    let right = ROWS * COLS - 1;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        if(matrix[Math.floor(mid / COLS)][mid % COLS] === target) {
            return true;
        } else if(matrix[Math.floor(mid / COLS)][mid % COLS] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }

    }

    return false;
    
};