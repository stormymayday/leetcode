function subsets(nums: number[]): number[][] {
    function helper(nums: number[], index: number) {
        if(index === nums.length) {
            return [[]];
        }

        const first = nums[index];
        const withoutFirst = helper(nums, index + 1);
        const withFirst = [];
        for(const subset of withoutFirst) {
            withFirst.push([first, ...subset]);
        }
        return [...withoutFirst, ...withFirst];

    }
    return helper(nums, 0);
};