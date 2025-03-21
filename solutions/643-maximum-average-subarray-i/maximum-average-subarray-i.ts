function findMaxAverage(nums: number[], k: number): number {
    // Initialize maxAverage to negative infinity to handle negative values
    let maxAverage = -Infinity;
    
    // Edge case: if k is larger than the array length, return 0
    if(k > nums.length) {
        return 0;
    }

    // Initialize left pointer for sliding window and the sum tracker
    let left = 0;
    let windowMax = 0;
    
    // Iterate through the array with the right pointer
    for(let right = 0; right < nums.length; right++) {
        // Add the current element to our window sum
        windowMax += nums[right];

        // Check if our window has reached the required size k
        if(right - left + 1 === k) {
            // Calculate the average for the current window and update maxAverage if needed
            maxAverage = Math.max(maxAverage, windowMax/k);
            
            // Remove the leftmost element from our window sum as we're about to slide
            windowMax -= nums[left];
            
            // Move the left pointer to slide the window
            left++;
        } else {
            // Window hasn't reached size k yet, continue expanding
            continue;
        }
    }
    
    // Return the maximum average found
    return maxAverage;
};