function subsetXORSum(nums: number[]): number {
    let xorTotal = 0;
    function helper(index: number, xorSum: number): void {
        if(index === nums.length) {
            xorTotal += xorSum;
            return;
        }
        helper(index + 1, xorSum ^ nums[index]);
        helper(index + 1, xorSum);
    }
    helper(0, 0);
    return xorTotal;
};