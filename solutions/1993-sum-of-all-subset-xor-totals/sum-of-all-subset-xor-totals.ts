function subsetXORSum(nums: number[]): number {
    let res = 0;
    const subset = [];
    function helper(index) {
        if(index === nums.length) {
            let xorr = 0;
            for(const num of subset) {
                xorr ^= num; 
            }
            res += xorr;
            return;
        }

        subset.push(nums[index]);
        helper(index + 1);
        subset.pop();
        helper(index + 1);
    }
    helper(0);
    return res;
};