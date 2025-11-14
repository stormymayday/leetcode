function findPeakElement(nums: number[]): number {

    let left: number = 0;
    let right: number = nums.length - 1;

    while (left <= right) {

        const mid: number = left + Math.floor((right - left) / 2);

        // found peak
        if (
            // value at 'mid' is greater than w/e is to it's left (array value or -Infinity if index is out of bounds on the left)
            (nums[mid] > (mid - 1 >= 0 ? nums[mid - 1] : -Infinity)) &&
            // AND value at 'mid' is greater than w/e is to it's right (array value or -Infinity if index is out of bounds on the right)
            (nums[mid] > (mid + 1 <= nums.length - 1 ? nums[mid + 1] : -Infinity))
        ) {
            return mid;
        }
        else if (
            // value at 'mid' is GREATER than the 'real' value to it's he left
            // If we go left, and that next value is on the left edge 
            // it can't be peak because current value will be to it's right and it is greater
            nums[mid] > nums[mid - 1] ||
            // OR value at 'mid' is on the left edge AND it's smaller than a real value to it's right
            // (nums[mid] < nums[mid + 1] && mid - 1 < 0)
            nums[mid] < nums[mid + 1]

        ) {
            // Therefore, discard left
            left = mid + 1;
        }

        else if (
            // Similarly, if value at 'mid' is greater than the 'real' value to it's right
            // If we go right, and that next value is on the right edge
            // it can't be peak because current value will be to it's left and it is greater
            nums[mid] > nums[mid + 1] ||
            // OR value at 'mid' is on the right edge AND it's smaller than a real value to it's left
            // (nums[mid] < nums[mid - 1] && mid + 1 > nums.length - 1)
            nums[mid] < nums[mid - 1]
        ) {
            // Therefore, discard right
            right = mid - 1;
        }

    }

};