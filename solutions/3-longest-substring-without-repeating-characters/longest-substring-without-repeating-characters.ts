function lengthOfLongestSubstring(s: string): number {
    // Track the maximum length of non-repeating substring found
    let result = 0;

    // Hash map to store the most recent index of each character
    const charSeenAtIndex: Record<string, number> = {};

    // Left boundary of our sliding window
    let left = 0;
    
    // Iterate through the string with the right pointer
    for(let right = 0; right < s.length; right++) {
        // Get the current character
        const currentChar = s[right];

        // If this is the first time we've seen this character
        if(charSeenAtIndex[currentChar] === undefined) {
            // Record its position in our hash map
            charSeenAtIndex[currentChar] = right;
        } else {
            // If we've seen this character before
            
            // Only update left pointer if the previous occurrence is within current window
            if(charSeenAtIndex[currentChar] >= left) {
                // Move left pointer to position just after the previous occurrence
                left = charSeenAtIndex[currentChar] + 1;
            }
            // If previous occurrence is before current window, no need to move left

            // Update the character's last seen position
            charSeenAtIndex[currentChar] = right;
        }

        // Calculate current window size and update maximum if needed
        // right - left + 1 represents the length of current valid window
        result = Math.max(result, right - left + 1);
    }

    // Return the length of longest substring without repeating characters
    return result;
};