function searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    let candidate = nums.length;
    while(left <= right) {
        const mid = left + Math.floor((right - left)/2);
        if(nums[mid] >= target) {
            candidate = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return candidate;
};