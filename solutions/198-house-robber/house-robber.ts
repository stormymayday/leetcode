function rob(nums: number[], i: number = 0, memo: Record<number, number> = {}): number {
    if(i in memo) {
        return memo[i];
    }

    if(i >= nums.length) {
        return 0;
    }

    const include = nums[i] + rob(nums, i + 2, memo);
    const exclude = rob(nums, i + 1, memo);

    memo[i] = Math.max(include, exclude);

    return memo[i];
};