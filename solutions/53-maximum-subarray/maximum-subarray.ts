function maxSubArray(nums: number[]): number {

    let max = -Infinity;
    let currSum = 0;
    for(let i = 0; i < nums.length; i += 1) {
        // Reset currSum if it goes below zero
        currSum = Math.max(currSum, 0);
        currSum += nums[i];
        max = Math.max(max, currSum);
    }
    return max;
    
};