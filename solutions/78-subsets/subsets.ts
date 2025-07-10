function subsets(nums: number[]): number[][] {
    if(nums.length === 0) {
        return [[]];
    }

    const current = nums[0];
    const withCurrent = [];
    const withoutCurrent = subsets(nums.slice(1));
    for(const subset of withoutCurrent) {
        withCurrent.push([current, ...subset]);
    }
    return [...withCurrent, ...withoutCurrent];
};