function canJump(nums: number[], i: number = 0, memo: Record<number, boolean> = {}): boolean {
    
    if(i in memo) {
        return memo[i];
    }

    if(i >= nums.length - 1) {
        return true;
    }

    const currentMaxJumps = nums[i];
    for(let jump = 1; jump <= currentMaxJumps; jump += 1) {
        if(canJump(nums, i + jump, memo) === true) {
            memo[i] = true;
            return true;
        }
    }

    memo[i] = false;
    return false;
};