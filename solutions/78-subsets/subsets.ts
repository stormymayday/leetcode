function subsets(nums: number[]): number[][] {
    const res = [];
    const subset = [];
    function helper(index) {

        // Base Case
        if(index === nums.length) {
            res.push([...subset]);
            return;
        }

        // Include
        subset.push(nums[index]);
        helper(index + 1);

        // Backtrack
        subset.pop();

        // Exclude
        helper(index + 1);
    }
    helper(0);
    return res;
};