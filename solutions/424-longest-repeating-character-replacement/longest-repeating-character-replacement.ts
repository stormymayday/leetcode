function characterReplacement(s: string, k: number): number {
    // Track the maximum valid substring length
    let result = 0;
    
    // Object to track frequency of each character in current window
    const charCount = {};
    
    // Left boundary of sliding window
    let left = 0;
    
    // Right boundary of sliding window (expands in each iteration)
    for(let right = 0; right < s.length; right++) {
        // Get current character at right pointer
        const currentChar = s[right];
        
        // Update frequency count for current character
        if(charCount[currentChar] === undefined) {
            charCount[currentChar] = 1;
        } else {
            charCount[currentChar]++;
        }
        
        // Calculate if current window is valid:
        // A window is valid if (window size) - (count of most frequent char) <= k
        // This tells us if we can replace at most k characters to make all the same
        if((right - left + 1) - Math.max(...Object.values(charCount) as number[]) <= k) {
            // Window is valid, update result with current window size
            result = Math.max(result, right - left + 1);
        } else {
            // Window is invalid (requires more than k replacements)
            // Shrink window from left until it becomes valid again
            while((right - left + 1) - Math.max(...Object.values(charCount) as number[]) > k) {
                // Get the character at left boundary
                const leftMostChar = s[left];
                
                // Decrease its frequency count
                charCount[leftMostChar]--;
                
                // Remove character from count object if frequency becomes zero
                if(charCount[leftMostChar] === 0) {
                    delete charCount[leftMostChar];
                }
                
                // Move left pointer to shrink window
                left++;
            }
        }
    }
    
    // Return the maximum valid substring length found
    return result;
}