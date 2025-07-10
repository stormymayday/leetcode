function subsets(nums: number[]): number[][] {
    const res = [];
    const subset = [];
    function helper(index: number):void {

        if(index === nums.length) {
            res.push([...subset]);
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