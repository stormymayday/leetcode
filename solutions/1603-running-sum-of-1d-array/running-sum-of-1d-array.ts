function runningSum(nums: number[]): number[] {
    let sum = 0;
    for(let i = 0; i < nums.length; i += 1) {
        sum += nums[i];
        nums[i] = sum;
    }
    return nums;
};