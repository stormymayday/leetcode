function maxSubArray(nums: number[]): number {

    let max = -Infinity;
    let currSum = 0;

    for (let i = 0; i < nums.length; i += 1) {
        currSum += nums[i];
        max = Math.max(max, currSum);
        if(currSum < 0) {
            currSum = 0;
        }
    }

    return max;
};