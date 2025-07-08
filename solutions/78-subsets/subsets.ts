function subsets(nums: number[]): number[][] {
    const result = [];
    const curSet = [];
    function helper(index) {

        if(index === nums.length) {
            result.push([...curSet]);
            return;
        }

        // include
        curSet.push(nums[index]);
        helper(index + 1);

        // backtrack
        curSet.pop();

        // exclude
        helper(index + 1);

    }
    helper(0);
    return result;
};