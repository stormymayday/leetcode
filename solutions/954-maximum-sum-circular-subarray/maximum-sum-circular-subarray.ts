function maxSubarraySumCircular(nums: number[]): number {

    const n = nums.length;

    // Phase 1: fill out the rightMax
    const rightMax = new Array(n).fill(0);
    rightMax[n - 1] = nums[n - 1];
    let postfixSum = nums[n - 1];
    for(let i = n - 2; i >= 0; i -= 1) {
        postfixSum += nums[i];
        rightMax[i] = Math.max(rightMax[i + 1], postfixSum);
    }

    // Phase 2: Prefix Sum + rightMax[i + 1] vs Kadane's Maximum Subarray
    let maxSum = -Infinity;  // for Kadane's
    let currSum = 0; // for Kadane's
    let prefixSum = 0;
    for(let i = 0; i < nums.length; i += 1) {

        // Kadane's
        currSum += nums[i];
        maxSum = Math.max(maxSum, currSum);
        if(currSum < 0) {
            currSum = 0;
        }

        // Non-overlapping prefixSum and rightMax
        prefixSum += nums[i];
        if(i + 1 < n) {
            maxSum = Math.max(maxSum, prefixSum + rightMax[i + 1]);
        }

    }

    return maxSum;
};