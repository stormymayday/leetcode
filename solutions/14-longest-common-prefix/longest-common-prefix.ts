function longestCommonPrefix(strs: string[]): string {
    let result = "";

    // Edge Case: empty array
    if (strs.length === 0) {
        return result;
    }

    // Find length of the shortest string in the array
    let minLength = Infinity;
    for (const str of strs) {
        minLength = Math.min(str.length, minLength);
    }

    // Check each character position up to the minimum length
    for (let i = 0; i < minLength; i++) {
        // Check if current character matches across all strings
        for (const str of strs) {
            if (str[i] !== strs[0][i]) {
                // If any mismatch is found, return the result so far
                return result;
            }
        }
        // After confirming all strings match at position i, add that character
        result += strs[0][i];
    }

    return result;
}