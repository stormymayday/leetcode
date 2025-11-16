function findPeakElement(nums: number[]): number {

    if (nums.length === 1 || nums[0] > nums[1]) {
        return 0;
    }

    if (nums[nums.length - 1] > nums[nums.length - 2]) {
        return nums.length - 1;
    }

    let left: number = 0;
    let right: number = nums.length - 1;
    let candidate: number = 0;
    while (left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        if (
            // if value at 'mid' is greater than value to it's left
            (nums[mid] > (mid - 1 >= 0 ? nums[mid - 1] : -Infinity)) &&
            // AND greater than value to it's right
            (nums[mid] > (mid + 1 <= nums.length - 1 ? nums[mid + 1] : -Infinity))
        ) {
            // this is a peak
            return mid;
        } else if (
            // if value at 'mid' is greater than value to it's left
            (nums[mid] > (mid - 1 >= 0 ? nums[mid - 1] : -Infinity)) &&
            // AND smaller than value to it's right
            (nums[mid] < (mid + 1 <= nums.length - 1 ? nums[mid + 1] : -Infinity))
        ) {
            // There is guaranteed to be a peak somwehere on the right
            candidate = mid + 1;
            left = mid + 1;
        } else if (
            // if value at 'mid' is less than value to it's left
            (nums[mid] > (mid - 1 >= 0 ? nums[mid - 1] : -Infinity)) &&
            // AND greater than value to it's right
            (nums[mid] > (mid + 1 <= nums.length - 1 ? nums[mid + 1] : -Infinity))
        ) {
            // There is guaranteed to be a peak somwehere on the left
            candidate = mid - 1;
            right = mid - 1;
        } 
        // value at mid is smaller than valus to it's left and right
        else {
            // can go either way?
            candidate = mid - 1;
            right = mid - 1;
        }

    }

    return candidate;

};