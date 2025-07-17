function subsetXORSum(nums: number[]): number {
    let XORTotals = 0;
    function helper(index: number, XORSum: number): void {
        if(index === nums.length) {
            XORTotals += XORSum;
            return;
        }

        helper(index + 1, XORSum ^ nums[index]);
        helper(index + 1, XORSum);
    }
    helper(0, 0);
    return XORTotals;
};