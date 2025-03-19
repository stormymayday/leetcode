/**
 * Converts a character to its 0-based index in the alphabet (A=0, B=1, etc.)
 * @param char The character to convert
 * @returns The 0-based index of the character in the alphabet
 */
function indexOfChar(char: string): number {
    // Calculate the position in the alphabet (assuming uppercase characters)
    // 'A' is at position 0, 'B' at 1, etc.
    return char.charCodeAt(0) - 'A'.charCodeAt(0);
}

function characterReplacement(s: string, k: number): number {
    // Track the maximum valid substring length
    let result = 0;
    
    // Array to count occurrences of each character in the current window
    // Index 0 corresponds to 'A', 1 to 'B', etc.
    const sCount = new Array(26).fill(0);
    
    // Pointers defining the sliding window boundaries
    let left = 0;
    let right = 0;
    
    // In each iteration, we'll either expand right or contract left, but never both
    while(right < s.length) {
        // Add the current character at right to our frequency count
        // We're tentatively including this character in our window
        sCount[indexOfChar(s[right])]++;
        
        // Check if the window is valid after adding the character
        // A window is valid if: (window size) - (count of most frequent char) <= k
        // This represents how many characters we would need to replace
        if(right - left + 1 - Math.max(...sCount) <= k) {
            // The window is valid after adding the character at right
            
            // Update the maximum valid window length
            result = Math.max(result, right - left + 1);
            
            // Continue expanding the window by moving right
            right++;
        } else {
            // The window becomes invalid if we include the character at right
            
            // Remove the leftmost character from our window
            sCount[indexOfChar(s[left])]--;
            
            // CRITICAL: We must also remove the character at right from our counts
            // This is because we tried to add it to our window (incremented its count),
            // but found that it would make our window invalid
            // Since we're not advancing right, we need to undo this addition
            // The next iteration will try to add this character again
            sCount[indexOfChar(s[right])]--;
            
            // Move left to contract the window
            left++;
            
            // Note: right pointer stays in place, meaning in the next iteration
            // we'll try again to include the character at the current right position
        }
    }
    
    return result;
}