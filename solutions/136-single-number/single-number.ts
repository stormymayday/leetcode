function singleNumber(nums: number[]): number {
    for (let i = 0; i < nums.length; i += 1) {
        let count = 0;
        for (let j = 0; j < nums.length; j += 1) {
            if (nums[i] === nums[j]) {
                count += 1;
            }
        }
        if (count === 1) {
            return nums[i];
        }
    }
};