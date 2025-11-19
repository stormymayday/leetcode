function search(nums: number[], target: number): boolean {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) {
            return true;
        }

        // Edge Case: mid === left && mid === right
        if (nums[mid] === nums[left] && nums[mid] === nums[right]) {
            // Shrink from left and right
            left += 1;
            right -= 1;
            continue;
        }

        // Identify the sorted half
        // If left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                // Target can be in the left half
                right = mid - 1;
            } else {
                // Target can't be in the left half
                left = mid + 1;
            }
        }
        // Otherwise, right half must be sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                // Target can be in the right half
                left = mid + 1;
            } else {
                // Target can't be in the right half
                right = mid - 1;
            }
        }
    }
    return false;
};