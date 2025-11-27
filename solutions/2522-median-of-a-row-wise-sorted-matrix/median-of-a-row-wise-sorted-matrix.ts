function matrixMedian(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;
    const numElementsLeftOfMedian = Math.floor(ROWS * COLS / 2);

    // Phase 1: Finding min (left) & max (right)
    let left = Infinity;
    let right = -Infinity;
    for (let row = 0; row < ROWS; row += 1) {
        // smallest number in the matrix (scan the leftmost column)
        if (grid[row][0] < left) {
            left = grid[row][0];
        }
        // largest number in the matrix (scan the rightmost column)
        if (grid[row][grid[0].length - 1] > right) {
            right = grid[row][grid[0].length - 1];
        }
    }

    // Phase 2: Binary Search on the range between min & max
    while (left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        const numberOfElementsLessThanOrEqualTo = greaterThanOrEqualToCount(grid, mid);

        // comarping it against the number of elements to left of median
        // we are looking  for number greater than or equal to 'numElementsLeftOfMedian'
        if (numberOfElementsLessThanOrEqualTo > numElementsLeftOfMedian) {
            // potential candidate
            right = mid - 1;
        } else {
            left = mid + 1;
        }

    }

    return left;

};

function greaterThanOrEqualToCount(matrix: number[][], target: number): number {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    let count = 0;

    for (let row = 0; row < ROWS; row += 1) {

        // Run Binary Search - Upper Bound on each row to count number of elements that are less than or equal to 'target'
        count += upperBound(matrix[row], target);

    }

    return count;

}

function upperBound(arr: number[], target: number): number {
    let left = 0; // first col
    let right = arr.length - 1; // last col

    while (left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        // mid is less than or equal to target
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            // mid is greater than target
            right = mid - 1;
        }

    }

    return left;
}