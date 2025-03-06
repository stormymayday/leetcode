function longestCommonPrefix(strs: string[]): string {
    // Edge Case: if the array is empty, return empty string
    if(strs.length === 0) {
        return "";
    }
    
    // Find the length of the shortest string in the array
    // This sets an upper bound on how long our common prefix can be
    let minLength = Infinity;
    for(const str of strs) {
        minLength = Math.min(minLength, str.length);
    }
    
    // Check each character position, up to the minimum length
    let i = 0;
    while(i < minLength) {
        // Get the character at current position from the first string
        const currentChar = strs[0][i];
        
        // Compare this character with the same position in all other strings
        for(const str of strs) {
            // If we find any mismatch, return the prefix found so far
            if(str[i] !== currentChar) {
                return strs[0].substring(0, i);
            }
        }
        
        // If all strings match at this position, move to the next character
        i++;
    }
    
    // If we've checked all positions up to minLength without finding
    // a mismatch, return the prefix of length minLength
    return strs[0].substring(0, i);
};