function findPeakElement(nums: number[]): number {

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        // Exit condition
        if (
            // If mid is greater than w/e to it's left AND right
            // (out of bounds considered -Infinity)
            (mid - 1 < 0 || nums[mid] > nums[mid - 1]) &&
            (mid + 1 === nums.length || nums[mid] > nums[mid + 1])
        ) {
            return mid;
        }

        // Always Go to the 'greater' side
        if (    

            // If to the left of mis is out of bounds AND mid is less than its' right neighbor
            (mid - 1 < 0 && nums[mid] < nums[mid + 1]) ||
            // OR mid is greater than it's left neighbor
            (nums[mid] > nums[mid - 1])
        ) {
            // go Right
            left = mid + 1;
        } else {
            right = mid - 1;
        }

    }
};