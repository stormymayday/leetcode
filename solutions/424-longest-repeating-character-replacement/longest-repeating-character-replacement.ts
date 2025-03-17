function characterReplacement(s: string, k: number): number {
    // Track the maximum valid substring length
    let result = 0;
    
    // Use a fixed-size array for O(1) access to character counts
    // Index 0 represents 'A', 1 represents 'B', etc.
    const charCount: number[] = new Array(26).fill(0);
    
    // Left boundary of sliding window
    let left = 0;
    
    // Right boundary of sliding window (expands in each iteration)
    for(let right = 0; right < s.length; right++) {
        // Get current character at right pointer and increment its count
        // Convert character to array index (A=0, B=1, etc.)
        const currentChar = s[right];
        charCount[currentChar.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        
        // If window becomes invalid, shrink it from the left until valid
        // A window is invalid if (window size) - (count of most frequent char) > k
        while((right - left + 1) - Math.max(...charCount) > k) {
            // Decrement count of the character being removed from the window
            const leftMostChar = s[left];
            charCount[leftMostChar.charCodeAt(0) - 'A'.charCodeAt(0)]--;
            
            // Move left pointer to shrink window
            left++;
        }
        
        // Update result with current window size (window is now valid)
        result = Math.max(result, right - left + 1);
    }
    
    // Return the maximum valid substring length found
    return result;
}