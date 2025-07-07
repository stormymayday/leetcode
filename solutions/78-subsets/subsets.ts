function subsets(nums: number[]): number[][] {
    function helper(nums: number[], index: number) {
        if(index === nums.length) {
            return [[]];
        }

        const first = nums[index];
        const withoutFirst = helper(nums, index + 1);
        const withFirst = [];
        for(const subset of withoutFirst) {
            const temp = [];
            temp.push(first);
            for(const element of subset) {
                temp.push(element);
            }
            withFirst.push(temp);
        }
        return [...withoutFirst, ...withFirst];

    }
    return helper(nums, 0);
};