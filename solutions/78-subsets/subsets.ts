function subsets(nums: number[]): number[][] {
    if(nums.length === 0) {
        return [[]];
    }

    const first = nums[0];

    const subsetsWithoutFirst = subsets(nums.slice(1));

    const subsetsWithFirst = [];

    for(const subset of subsetsWithoutFirst) {
        subsetsWithFirst.push([first, ...subset]);
    }

    return [...subsetsWithoutFirst, ...subsetsWithFirst];
};