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
        else if (nums[mid] < nums[mid + 1]) {
            // search on a side that is 'greater'
            left = mid + 1;
        }

        else if (nums[mid] < nums[mid - 1]) {
            // search on a side that is 'greater'
            right = mid - 1;
        }

    }

};