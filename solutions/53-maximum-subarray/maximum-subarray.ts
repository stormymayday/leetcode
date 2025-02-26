function maxSubArray(nums: number[]): number {
		// Initialize max sum with first element
    let maxSubarraySum = nums[0];
    // Start current sum from first element
    let currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
		    // Extend or reset
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        // Update max sum
        maxSubarraySum = Math.max(maxSubarraySum, currentSum);
    }

    return maxSubarraySum;
}