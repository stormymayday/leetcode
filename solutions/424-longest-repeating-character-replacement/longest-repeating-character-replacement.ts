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
    
    // Expand the window by moving the right pointer
    while(right < s.length) {
        // Add the current character to our frequency count
        sCount[indexOfChar(s[right])]++;
        
        // Check if the current window is valid
        // A window is valid if: (total window size) - (count of most frequent char) <= k
        // This difference represents how many characters we need to replace
        while(right - left + 1 - Math.max(...sCount) > k) {
            // If we need more than k replacements, the window is invalid
            // Shrink the window by moving the left pointer
            sCount[indexOfChar(s[left])]--;
            left++;
        }
        
        // Update the maximum valid window length
        result = Math.max(result, right - left + 1);
        
        // Continue expanding the window
        right++;
    }
    
    return result;
}