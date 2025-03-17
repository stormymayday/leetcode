function minSubArrayLen(target: number, nums: number[]): number {
    // Initialize minimum length to Infinity to track the smallest valid subarray
    let distance = Infinity;

    // Left pointer for the sliding window
    let left = 0;
    // Running sum of the current window
    let sum = 0;
    
    // Right pointer expands the window
    for(let right = 0; right < nums.length; right++) {
        // Add the current element to our running sum
        sum += nums[right];

        // When sum becomes >= target, try to minimize the window
        // by removing elements from the left side
        while(sum >= target) {
            // Update minimum distance if current window is smaller
            distance = Math.min(distance, right - left + 1);
            
            // Remove the leftmost element from the sum
            sum -= nums[left];
            
            // Shrink the window from the left
            left++;
        }
    }

    // If distance is still Infinity, no valid subarray was found
    // Return 0 in this case, otherwise return the minimum length found
    return distance > nums.length ? 0 : distance;
};