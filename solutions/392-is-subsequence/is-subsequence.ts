function isSubsequence(s: string, t: string): boolean {
    // Edge case: empty string is always a subsequence
    if (s.length === 0) return true;

     // Pointer for string s
    let sIndex = 0;
    
    for(let tIndex = 0; tIndex < t.length; tIndex++) {
        // If current characters match, move s pointer forward
        if(s[sIndex] === t[tIndex]) {
            sIndex++;
        } 
        
        // Check if we've matched all characters in s
        if(sIndex === s.length) {
            return true;
        }
    }

    return false;
};