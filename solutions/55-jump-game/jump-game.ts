function canJump(nums: number[], i:number = 0, memo: Record<number, boolean> = {}): boolean {
    
    if(i in memo) {
        return memo[i];
    }

    if(i >= nums.length - 1) {
        return true;
    }

    const maxJumps = nums[i];
    for(let jumps = 1; jumps <= maxJumps; jumps += 1) {
        if(canJump(nums, i + jumps, memo) === true) {
            memo[i] = true;
            return true;
        }
    }

    memo[i] = false;
    return false;
};