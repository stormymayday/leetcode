function maxSubarraySumCircular(nums: number[]): number {

    const n = nums.length;
    
    let maxSum = -Infinity;
    let currSum = 0;

    let total = 0;
    let minSum = Infinity;
    let currMin = 0;

    for(let i = 0; i < n; i += 1) {

        currSum += nums[i];
        maxSum = Math.max(maxSum, currSum);
        if(currSum < 0) {
            currSum = 0;
        }

        currMin += nums[i];
        minSum = Math.min(minSum, currMin);
        if(currMin > 0) {
            currMin = 0;
        }

        total += nums[i];

    }

    // Edge Case: all negative numbers
    return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;

};