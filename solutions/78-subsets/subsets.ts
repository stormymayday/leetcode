function subsets(nums: number[]): number[][] {
    const result: number[][] = [];
    const curSet: number[] = [];
    helper(0, nums, curSet, result);
    return result;
};

function helper(i: number, nums: number[], curSet: number[], result: number[][]):void {
    // Base Case
    if(i === nums.length) {
        result.push([...curSet]);
        return;
    }

    // include
    curSet.push(nums[i]);
    helper(i + 1, nums, curSet, result);
    curSet.pop();

    // exclude
    helper(i + 1, nums, curSet, result);
}