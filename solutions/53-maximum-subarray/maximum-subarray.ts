function maxSubArray(nums: number[]): number {

    let maxSum = -Infinity;
    let currSum = 0;

    for (let i = 0; i < nums.length; i += 1) {
        // add to curr
        currSum += nums[i];

        // update max
        if(currSum > maxSum) {
            maxSum = currSum;
        }

        // don't carry negative
        if(currSum < 0) {
            currSum = 0;
        }
    }

    return maxSum;
};