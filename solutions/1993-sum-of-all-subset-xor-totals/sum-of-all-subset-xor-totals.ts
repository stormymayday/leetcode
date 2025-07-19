function subsetXORSum(nums: number[]): number {
    function helper(index: number, xorTotal: number): number {
        if(index === nums.length) {
            return xorTotal;
        }
        return helper(index + 1, xorTotal ^ nums[index]) + helper(index + 1, xorTotal);
    }
    return helper(0, 0);
};