function canJump(nums: number[], i: number = 0, memo: Record<number, boolean> = {}): boolean {
    // Base Case: memo fetching
    if(i in memo) {
        return memo[i];
    }
    
    // Base Case: Reaching or passing the last index
    if(i >= nums.length - 1) {
        return true;
    }

    const maxSteps = nums[i];
    for(let step = 1; step <= maxSteps; step += 1) {
        if(canJump(nums, i + step, memo) === true) {
            memo[i] = true;
            return true;
        }
    }

    // Caching
    memo[i] = false;
    return false;
};