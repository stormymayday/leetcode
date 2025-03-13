function lengthOfLongestSubstring(s: string): number {
    // Track the maximum length of non-repeating substring
    let result = 0;
    
    // Use a Map to track the last seen index of each character
    const charSeenAtIndex = new Map<string, number>();
    
    // Left boundary of sliding window
    let left = 0;
    
    // Iterate through string with right pointer
    for(let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // If we've seen this character before
        if(charSeenAtIndex.has(currentChar)) {
            const prevIndex = charSeenAtIndex.get(currentChar);
            if(prevIndex >= left) {
                // Move left only if the character is within current window
                left = prevIndex + 1;
            }
        }
        
        // Update the current character's index in our map
        charSeenAtIndex.set(currentChar, right);
        
        // Calculate current window size and update maximum
        result = Math.max(result, right - left + 1);
    }
    
    return result;
};