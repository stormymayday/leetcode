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

    const memo = {};
    const includeFirst = helper(nums, 0, nums.length - 1, memo);
    const excludeFirst = helper(nums, 1, nums.length, memo);

    return Math.max(includeFirst, excludeFirst);

};

function helper(nums, start, end, memo) {

    const key = `${start},${end}`;

    if(key in memo) {
        return memo[key];
    }

    if(start >= end) {
        return 0;
    }

    const include = nums[start] + helper(nums, start + 2, end, memo);
    const exclude = helper(nums, start + 1, end, memo);

    memo[key] = Math.max(include, exclude);

    return memo[key];
}