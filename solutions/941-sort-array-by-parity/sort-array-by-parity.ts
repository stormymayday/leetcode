function sortArrayByParity(nums: number[]): number[] {
    const res = [];

    for (let i = 0; i < nums.length; i += 1) {
        if (nums[i] % 2 === 0) {
            res.push(nums[i]);
        }
    }

    for (let i = 0; i < nums.length; i += 1) {
        if (nums[i] % 2 !== 0) {
            res.push(nums[i]);
        }
    }

    return res;
};