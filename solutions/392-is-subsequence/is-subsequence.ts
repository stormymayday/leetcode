function isSubsequence(s: string, t: string): boolean {
    // Edge case 1: empty string is always a subsequence
    if (s.length === 0) {
        return true;
    }

    // Edge case 2: s is longer than t
    if (s.length > t.length) {
        return false;
    }

    // Pointer for string s
    let sIndex = 0;
    
    for(let tIndex = 0; tIndex < t.length; tIndex++) {
        // If current characters match
        if(s[sIndex] === t[tIndex]) {
            // move s pointer forward
            sIndex++;
        } 
        
        // Once sIndex is out of bounds (goes past last index in s)
        if(sIndex === s.length) {
            // We are done! It is a subsequence
            return true;
        }
    }
    // Subsequence was not found / reached
    return false;
};