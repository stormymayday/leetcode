function singleNumber(nums: number[]): number {
    for (let i = 0; i < nums.length; i += 1) {
        let count = 0;
        for (let j = 0; j < nums.length; j += 1) {
            if (i !== j && nums[i] === nums[j]) {
                count += 1;
                break;
            }
        }
        if (count === 0) {
            return nums[i];
        }
    }
};