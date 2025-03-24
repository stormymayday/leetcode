function longestOnes(nums: number[], k: number): number {
    // Initialize the result that will hold our maximum window length
    let result = 0;
    
    // Edge case: If k equals the array length, we can flip all elements
    // so the answer is the entire array length
    if(k === nums.length) {
        return nums.length;
    }
    
    // Initialize our sliding window pointers
    let left = 0;     // Left boundary of our window
    let right = 0;    // Right boundary of our window
    
    // Track how many flips we have remaining
    let kCount = k;
    
    // Expand the window by moving the right pointer
    while(right < nums.length) {
        
        // If we encounter a 0, we need to use a flip
        if(nums[right] === 0) {
            kCount--;
        }
        
        // If we've used more flips than allowed (kCount goes negative),
        // we need to shrink our window from the left
        while(kCount < 0) {
            // Move left pointer to shrink the window
            left++;
            
            // If the element we're removing from the window was a 0,
            // we get back one flip to use
            if(nums[left - 1] !== undefined && nums[left - 1] === 0) {
                kCount++;
            }
        }
        
        // At this point we have a valid window, so update our result
        // with the maximum window size we've seen so far
        result = Math.max(result, right - left + 1);
        
        // We update the result BEFORE incrementing right because:
        // 1. At this point, right points to the last valid element in our current window
        // 2. The window size calculation (right - left + 1) includes the element at position 'right'
        // 3. If we incremented right first, we'd be counting an element we haven't processed yet
        
        // Expand our window
        right++;
        // After incrementing right, it now points to the next element to be examined
        // in the next iteration of the while loop
    }
    
    // Return the maximum valid window size
    return result;
}