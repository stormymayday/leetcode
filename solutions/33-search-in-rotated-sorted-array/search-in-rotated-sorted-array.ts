function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {

        const mid = left + Math.floor((right - left)/2);

        // 1. Check if 'mid' is target
        if(nums[mid] === target) {
            return mid;
        }

        // 2. Identify which half is sorted
        // If left half is sorted
        if(nums[left] <= nums[mid]) {
            if(nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } 
        // Otherwise, right half must be sorted
        else {
            if(nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }


    }
    return -1;
};