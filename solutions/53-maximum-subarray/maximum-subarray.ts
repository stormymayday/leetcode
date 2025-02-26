function maxSubArray(nums: number[]): number {

    let maxSubarraySum: number = nums[0];
    let currentSum = 0;

    for(const num of nums) {
        // if negative
        if(currentSum < 0) {
            // reset
            currentSum = 0;
        }
        // Calculate current sum
        currentSum += num;
        // Check if it greater than max subarray sum
        maxSubarraySum = Math.max(maxSubarraySum, currentSum);
    }

    return maxSubarraySum;
    
};