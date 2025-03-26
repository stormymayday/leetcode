function minSubArrayLen(target: number, nums: number[]): number {
    // Initialize result with Infinity to track the minimum subarray length
    let result = Infinity;
    
    // Initialize current sum and left pointer of the sliding window
    let currentSum = 0;
    let left = 0;
    
    // Iterate through the array with the right pointer of the sliding window
    for(let right = 0; right < nums.length; right++) {
        // Expand the window by adding the current element
        currentSum += nums[right];

        // Shrink the window from the left while the sum is greater than or equal to target
        while(currentSum >= target) {
            // Update the minimum subarray length
            result = Math.min(result, right - left + 1);
            
            // Remove elements from the left side of the window
            currentSum -= nums[left];
            left++;
        }
    }

    // Return 0 if no valid subarray is found, otherwise return the minimum length
    return result === Infinity ? 0 : result;
}