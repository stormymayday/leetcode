function rob(nums: number[]): number {
    if(nums.length === 0) {
        return 0;
    }

    if(nums.length === 1) {
        return nums[0];
    }

    if(nums.length === 2) {
        return Math.max(nums[0], nums[1]);
    }

    const includeFirst = helper(nums, 0, nums.length - 1, {});
    const excludeFirst = helper(nums, 1, nums.length, {});

    return Math.max(includeFirst, excludeFirst);

};

function helper(nums, start, end, memo) {

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