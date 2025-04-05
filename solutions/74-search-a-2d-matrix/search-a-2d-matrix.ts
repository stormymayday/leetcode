function searchMatrix(matrix: number[][], target: number): boolean {

    // Dimensions
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    // First Binary Search: find the target row
    let topRow = 0;
    let bottomRow = ROWS - 1;
    while(topRow <= bottomRow) {

        // calculate the middle row
        const midRow = Math.floor((topRow + bottomRow) / 2);

        // if target is greater than the largest element in this (middle) row
        if(target > matrix[midRow][COLS - 1]) {
            // Move the topRow down past the current middle
            topRow = midRow + 1;
        }
        // if target is smaller than the smallest element in this (middle) row
        else if(target < matrix[midRow][0]) {
           // Move the bottom row up past the current middle
           bottomRow = midRow - 1;
        }
        // target can be in this row
        else {
            break;
        }
    }

    // Check if target row exists (the row pointers didn't cross)
    if(topRow > bottomRow) {
        // Pointers have crossed
        return false;
    }

    // Second Binary Search: search the targetRow
    const targetRow = Math.floor((topRow + bottomRow) / 2);
    let left = 0;
    let right = COLS - 1;
    while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        if(matrix[targetRow][mid] > target) {
            right = mid - 1;
        } else if(matrix[targetRow][mid] < target) {
            left = mid + 1;
        } else {
            return true;
        }
    }

    // Target was not found
    return false;
    
};