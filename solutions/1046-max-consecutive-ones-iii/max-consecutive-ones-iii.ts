function longestOnes(nums: number[], k: number): number {
    // Track our final answer - the maximum length of valid subarray
    let result = 0;
    
    // Track how many flips we have remaining out of our initial k
    let numberOfKsLeft = k;
    
    // Track the current window's length
    let currentMax = 0;
    
    // Left pointer for our sliding window
    let left = 0;
    
    // Right pointer iterates through the array
    for (let right = 0; right < nums.length; right++) {
        
        // Case 1: Current element is a 1, no flip needed
        if (nums[right] === 1) {
            // Update current window size
            currentMax = right - left + 1;
            // Update result if current window is longer
            result = Math.max(result, currentMax);
        } 
        // Case 2: Current element is a 0 and we have flips available
        else if (nums[right] === 0 && numberOfKsLeft > 0) {
            // Update current window size
            currentMax = right - left + 1;
            // Update result if current window is longer
            result = Math.max(result, currentMax);
            // Use one flip
            numberOfKsLeft--;
        } 
        // Case 3: Current element is a 0 and we have no flips available
        else {
            // Shrink window from left until we have a flip available
            while (numberOfKsLeft === 0) {
                // If we're removing a previously flipped 0 from our window
                if (nums[left] === 0) {
                    // We get that flip back
                    numberOfKsLeft++;
                }
                // Move left pointer to shrink window
                left++;
            }
            
            // Now we have a flip available, use it for the current zero
            numberOfKsLeft--;
            
            // Update current window size after shifting left pointer
            currentMax = right - left + 1;
            
            // Update result if current window is longer
            result = Math.max(result, currentMax);
        }
    }
    
    // Return the maximum length found
    return result;
};