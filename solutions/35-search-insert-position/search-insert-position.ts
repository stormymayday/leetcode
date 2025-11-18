function searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    // setting candidate equal to length incase there are no elements greater than or equal to target
    let candidate = nums.length;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        // Looking for a first element greater than or equal to target
        if (nums[mid] >= target) {
            // potential candidate
            candidate = mid;
            // everything to the right must be larger than mid
            // therefore, look for potentially better candidate to the left
            right = mid - 1;
        }
        // value at 'mid' is strictly less than target
        else {
            // not a candidate
            left = mid + 1; // just discard left side
        }
    }
    return candidate;
};