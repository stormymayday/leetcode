function searchMatrix(matrix: number[][], target: number): boolean {
    
    // Second binary search: search within the row
    let left = 0;
    let right = matrix.length - 1;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        // Check if target is in this row's range
        if(matrix[mid][0] <= target && target <= matrix[mid][matrix[0].length - 1]) {
            
            // Second binary search: search within the row
            let l = 0;
            let r = matrix[0].length - 1;

            while(l <= r) {

                const m = l + Math.floor((r - l) / 2);

                if(matrix[mid][m] === target) {
                    return true;
                } else if(matrix[mid][m] > target) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }

            }

            return false;

        } else if(matrix[mid][0] > target) {
            right = mid - 1;
        } else if(target > matrix[mid][matrix[0].length - 1]) {
            left = mid + 1;
        }

    }

    return false;

};