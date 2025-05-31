function rob(nums: number[], i: number = 0, memo: Record<number, number> = {}): number {
    // Memo Base Case
    if(i in memo) {
        return memo[i];
    }

    // Base Case
    if(i >= nums.length) {
        return 0;
    }

    // Recursive Step
    const include = nums[i] + rob(nums, i + 2, memo); // skipping second
    const exclude = rob(nums, i + 1, memo); // skipping first

    // Caching
    memo[i] = Math.max(include, exclude);

    return memo[i];
    
};