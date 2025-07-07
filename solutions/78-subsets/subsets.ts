function subsets(nums: number[]): number[][] {
    if(nums.length === 0) {
        return [[]];
    }

    const first = nums[0];
    const withoutFirst = subsets(nums.slice(1));
    const withFirst = [];
    for(const subset of withoutFirst) {
        withFirst.push([first, ...subset]);
    }
    return [...withoutFirst, ...withFirst];
};