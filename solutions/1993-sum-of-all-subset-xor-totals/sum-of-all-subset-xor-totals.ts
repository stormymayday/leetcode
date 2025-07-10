function subsetXORSum(nums: number[]): number {
    function helper(index: number, total: number):number {
        if(index === nums.length) {
            return total;
        }
        return helper(index + 1, total ^ nums[index]) + helper(index + 1, total);
    }
    return helper(0, 0);
};