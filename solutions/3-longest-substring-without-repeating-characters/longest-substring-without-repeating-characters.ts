function lengthOfLongestSubstring(s: string): number {
    // Track the maximum length of non-repeating substring found
    let result = 0;
    
    // Use a Set to track characters in the current window
    const set = new Set();
    
    // Initialize the sliding window boundaries
    let left = 0;
    let right = 0;
    
    // Expand the window to the right until we reach the end of the string
    while(right < s.length) {
        // Get the current character we're examining
        const currentChar = s[right];
        
        // If the current character is not in our window (not a duplicate)
        if(!set.has(currentChar)) {
            // Add it to our set
            set.add(currentChar);
            
            // Update our result with the current window size
            result = Math.max(result, right - left + 1);
            
            // Expand the window to the right
            right++;
        } else {
            // If we've found a duplicate:
            // Remove the leftmost character from our window
            set.delete(s[left]);
            
            // Shrink the window from the left
            left++;
            
            // Note: We don't increment right here, so we'll check this character again
            // in the next iteration after removing a character from the left
        }
    }
    
    // Return the maximum length found
    return result;
};