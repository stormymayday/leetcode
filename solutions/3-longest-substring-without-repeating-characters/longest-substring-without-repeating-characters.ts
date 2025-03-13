function lengthOfLongestSubstring(s: string): number {
    // Track the maximum length of non-repeating substring
    let result = 0;

    // Use a Set to track characters in the current window
    const set = new Set();

    // Left boundary of sliding window
    let left = 0;
    
    // Iterate through string with right pointer
    for(let right = 0; right < s.length; right++) {
        const currentChar = s[right];

        // If the current character isn't in our set
        if(!set.has(currentChar)) {
            // Add it to our set
            set.add(currentChar);
        } else {
            // If the character is already in our set (duplicate found)
            // Remove characters from the left until the duplicate is gone
            while(set.has(currentChar)) {
                // Get the leftmost character in our window
                const leftMostCharacter = s[left];
                
                // Remove it from our set
                set.delete(leftMostCharacter);
                
                // Move left pointer one step right
                left++;
            }
            
            // After removing the duplicate, add the current character back to the set
            // This is critical because:
            // 1. We've removed all instances of this character from our set in the while loop
            // 2. The current character (at position 'right') needs to be part of our new window
            // 3. Without this line, the character at the current position would be ignored
            // 4. The set must accurately represent all characters in our current window [left, right]
            set.add(currentChar);
        }

        // Update maximum length (set.size equals current window size)
        result = Math.max(result, set.size);
    }

    return result;
};