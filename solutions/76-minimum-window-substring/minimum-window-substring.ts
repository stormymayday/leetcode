/**
 * Maps characters to indices in our frequency arrays:
 * - 'a' to 'z' map to indices 0-25
 * - 'A' to 'Z' map to indices 26-51
 * @param char A single character to be mapped
 * @returns Index in the frequency array (0-51)
 */
function getCharIndex(char: string): number {
    if (char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    } else if (char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 26;
    }
    // Note: This function assumes only letters will be provided
    // Adding a default return value would improve robustness
}

/**
 * Checks if the current window contains all required characters from string t
 * A window is valid if for each character in t, the window has at least
 * the same number of occurrences of that character
 * 
 * @param sArr Character frequency array for current window in s
 * @param tArr Character frequency array for string t
 * @returns true if window is valid, false otherwise
 */
function isValidWindow(sArr: number[], tArr: number[]): boolean {
    for (let i = 0; i < 52; i++) {
        if (sArr[i] < tArr[i]) {
            return false;
        }
    }
    return true;
}

function minWindow(s: string, t: string): string {
    // Edge case: if t is longer than s, no valid window can exist
    if (t.length > s.length) {
        return "";
    }
    
    // Initialize character frequency arrays for both strings
    const sCharCount = new Array(52).fill(0);
    const tCharCount = new Array(52).fill(0);
    
    // Populate tCharCount with frequencies of characters in string t
    for (let i = 0; i < t.length; i++) {
        tCharCount[getCharIndex(t[i])]++;
        sCharCount[getCharIndex(s[i])]++;
    }

    if(isValidWindow(sCharCount, tCharCount)) {
        return s.slice(0, 0 + t.length);
    }

    // Variables to track the minimum window found
    let minLength = Infinity;
    let minLeft = 0;  // Start index of minimum window
    let left = 0;     // Current left boundary of sliding window
    let right = t.length - 1;
    
    // Expand right pointer through the string s
    while(right < s.length) {
       
        if(!isValidWindow(sCharCount, tCharCount)) {
            // window is invalid
            // expand right
            // Add the current character to our window
            right++;
            sCharCount[getCharIndex(s[right])]++;

            

        } else {
            // window is valid
            // shrink left
             if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minLeft = left;
            }
            
            // Remove leftmost character from window and move left pointer
            sCharCount[getCharIndex(s[left])]--;
            left++;
        }
        
        // Shrink window from left as long as it remains valid
        // while (isValidWindow(sCharCount, tCharCount)) {
        //     // CRITICAL: Only update minLength and minLeft when we find a smaller window
        //     // This prevents a subtle bug where minLeft could be updated to point to
        //     // a longer valid window, resulting in an incorrect answer
        //     if (right - left + 1 < minLength) {
        //         minLength = right - left + 1;
        //         minLeft = left;
        //     }
            
        //     // Remove leftmost character from window and move left pointer
        //     sCharCount[getCharIndex(s[left])]--;
        //     left++;
        // }

        
    }
    
    // If no valid window was found, minLength will still be Infinity
    return minLength === Infinity ? "" : s.slice(minLeft, minLeft + minLength);
}