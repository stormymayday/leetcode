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
            // Potential Dead End: If we go left, and the next mid value ends up the leftmost value
            // [1, 2 (current mid), 3]
            nums[mid] > nums[mid - 1] ||
            // OR value at 'mid' is less than a 'real' value to it's 'right'
            // Therefore, there is guaranteed peak somewhere on the right
            nums[mid] < nums[mid + 1]

        ) {
            // Therefore, discard left
            left = mid + 1;
        }

        else if (
            // Similarly, if value at 'mid' is greater than the 'real' value to it's right
            // Potential Dead End: If we go right, and the next mid value ends up the rightmost value
            // [3, 2 (current mid), 1]
            nums[mid] > nums[mid + 1] ||
            // OR value at 'mid' is less than a 'real' value to it's 'left'
            // Therefore, there is guaranteed peak somewhere on the left
            nums[mid] < nums[mid - 1]
        ) {
            // Therefore, discard right
            right = mid - 1;
        }

    }

};