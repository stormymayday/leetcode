function subsetXORSum(nums: number[]): number {
    function helper(index, sum) {
        if(index === nums.length) {
            return sum;
        }

        return helper(index + 1, sum ^ nums[index]) + helper(index + 1, sum);
    }
    return helper(0, 0);
};