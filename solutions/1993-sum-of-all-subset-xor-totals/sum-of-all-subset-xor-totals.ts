function subsetXORSum(nums: number[]): number {
    let XORTotals = 0;
    const curr = [];
    function helper(index): void {
        if(index === nums.length) {
            XORTotals += curr.reduce((acc, curr) => acc ^ curr, 0);
            return;
        }

        curr.push(nums[index]);
        helper(index + 1);
        curr.pop();
        helper(index + 1);
    }
    helper(0);
    return XORTotals;
};