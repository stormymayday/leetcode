/**
 * Maps a character to an index in the frequency array:
 * - Lowercase letters (a-z) map to indices 0-25
 * - Uppercase letters (A-Z) map to indices 26-51
 * 
 * @param char A single character
 * @return The corresponding index in the frequency array
 */
function indexOfChar(char: string): number {
    if(char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    } else if(char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 26;
    }
    // Note: Function doesn't handle non-alphabetic characters
}

/**
 * Compares two frequency arrays to check if they represent the same set of characters.
 * 
 * @param arr1 First frequency array
 * @param arr2 Second frequency array
 * @return True if the arrays have identical frequencies for all characters
 */
function compareCharCount(arr1: number[], arr2: number[]): boolean {
    for(let i = 0; i < 52; i++) {
        if(arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function checkInclusion(s1: string, s2: string): boolean {
    // Edge case: if s1 is longer than s2, no permutation of s1 can be in s2
    if(s1.length > s2.length) {
        return false;
    }
    
    // Create frequency arrays for both strings (52 positions for all letter cases)
    const s1Count = new Array(52).fill(0);
    const s2Count = new Array(52).fill(0);
    
    // Initialize frequency counts for the first window of size s1.length
    for(let i = 0; i < s1.length; i++) {
        s1Count[indexOfChar(s1[i])]++;  // Count characters in s1
        s2Count[indexOfChar(s2[i])]++;  // Count characters in the first window of s2
    }
    
    // Check if the first window is already a permutation of s1
    if(compareCharCount(s1Count, s2Count)) {
        return true;
    }
    
    // Slide the window through s2 one character at a time
    for(let right = s1.length; right < s2.length; right++) {
        // Calculate the index of the character leaving the window
        let left = right - s1.length;
        
        // Remove the character at the left edge of the window from our count
        s2Count[indexOfChar(s2[left])]--;
        
        // Add the new character at the right edge of the window to our count
        s2Count[indexOfChar(s2[right])]++;
        
        // Check if the current window's character frequencies match s1's
        if(compareCharCount(s1Count, s2Count)) {
            return true;  // Found a permutation of s1 in s2
        }
        
        // If no match, continue sliding the window
    }
    
    // If we've checked all possible windows and found no matches
    return false;
}