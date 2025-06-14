function rob(nums: number[], i:number = 0, memo: Record<number, number> = {}): number {
    
    if(i in memo) {
        return memo[i];
    }

    if(i >= nums.length) {
        return 0;
    }

    memo[i] = Math.max((nums[i] + rob(nums, i + 2, memo)), rob(nums, i + 1, memo));

    return memo[i];
};