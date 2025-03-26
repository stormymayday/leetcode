// Convert a character to a unique index
// Lowercase letters 'a'-'z' map to indices 0-25
// Uppercase letters 'A'-'Z' map to indices 26-51
function indexOfChar(char: string): number {
    // Map lowercase letters to 0-25 range
    if (char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    } 
    // Map uppercase letters to 26-51 range
    else if (char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 26;
    }
    // Note: This will return undefined for non-alphabetic characters
}

// Compare two character count arrays to check if they are identical
function compareCharCount(arr1: number[], arr2: number[]): boolean {
    // Iterate through all indices of the arrays
    for (let i = 0; i < arr1.length; i++) {
        // If any count differs, return false
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    // If all counts are the same, return true
    return true;
}

function checkInclusion(s1: string, s2: string): boolean {
    // If s1 is longer than s2, no permutation can exist
    if (s1.length > s2.length) {
        return false;
    }

    // Empty string is considered a permutation of anything
    if (s1.length === 0) {
        return true;
    }
    
    // Create character count arrays for both strings
    // 52 slots to accommodate lowercase and uppercase (not necessary) letters
    const s1CharCount = new Array(52).fill(0);
    const s2CharCount = new Array(52).fill(0);

    // Count characters in the initial window
    for (let i = 0; i < s1.length; i++) {
        s1CharCount[indexOfChar(s1[i])]++;
        s2CharCount[indexOfChar(s2[i])]++;
    }

    // Check if initial window is a permutation of s1
    if (compareCharCount(s1CharCount, s2CharCount)) {
        return true;
    }

    // Slide the window through s2
    for (let right = s1.length; right < s2.length; right++) {
        // Add the next character to the window
        s2CharCount[indexOfChar(s2[right])]++;

        // Remove the leftmost character from the previous window
        const left = right - s1.length;
        s2CharCount[indexOfChar(s2[left])]--;

        // Check if current window is a permutation of s1
        if (compareCharCount(s1CharCount, s2CharCount)) {
            return true;
        }
    }

    // No permutation found
    return false;
}