function rob(nums: number[]): number {

    // Edge Case 1: empty array (technically, works without this)
    if(nums.length === 0) {
        return 0; 
    }
    
    // Edge Case 2: single element
    if(nums.length === 1) {
        return nums[0];
    }

    // Optional optimization: two elements
    if(nums.length === 2) {
        return Math.max(nums[0], nums[1]);
    }

    // including first element, excluding last
    const max1 = helper(nums, 0, nums.length - 1, {});
    // excluding first element, includin last
    const max2 = helper(nums, 1, nums.length, {});

    return Math.max(max1, max2);
};

function helper(nums: number[], start: number, end: number, memo: Record<number, number>) {
    if(start in memo) {
        return memo[start];
    }

    if(start >= end) {
        return 0;
    }

    const include = nums[start] + helper(nums, start + 2, end, memo);
    const exclude = helper(nums, start + 1, end, memo);

    memo[start] = Math.max(include, exclude);

    return memo[start];
}