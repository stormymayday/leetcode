function rob(nums: number[], i: number = 0, memo: Record<number, number> = {}): number {
    // Base Case: memo fetching
    if(i in memo) {
        return memo[i];
    }

    // Base Case: out of bounds
    if(i >= nums.length) {
        return 0;
    }

    // Recursive Step
    const include = nums[i] + rob(nums, i + 2, memo);
    const exclude = rob(nums, i + 1, memo);

    // Caching
    memo[i] = Math.max(include, exclude);

    return memo[i];
};