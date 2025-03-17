function checkInclusion(s1: string, s2: string): boolean {
    // If s1 is longer than s2, it's impossible to find a permutation of s1 in s2
    if(s1.length > s2.length) {
        return false;
    }
    
    // Create two arrays to track character frequencies
    // Each array has 26 elements representing lowercase English letters (a-z)
    const charSet1 = new Array(26).fill(0); // Frequency count for s1
    const charSet2 = new Array(26).fill(0); // Frequency count for current window in s2
    
    // Fill initial character frequencies for both arrays
    // This represents s1 and the first window of s2 (of length s1.length)
    for(let i = 0; i < s1.length; i++) {
        // Get current character from s1 and increment its count in charSet1
        const currentCharInS1 = s1[i];
        charSet1[currentCharInS1.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        
        // Get current character from s2 and increment its count in charSet2
        const currentCharInS2 = s2[i];
        charSet2[currentCharInS2.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    
    // Initialize left pointer for sliding window
    let left = 0;
    
    // Slide the window through s2, starting with the first complete window
    // right begins at the end of the first window (s1.length - 1)
    for(let right = s1.length - 1; right < s2.length; right++) {
        // For each window position, count how many character frequencies match
        let count = 0;
        for(let i = 0; i < 26; i++) {
            // If the frequency count matches for this character, increment count
            if(charSet1[i] === charSet2[i]) {
                count++;
            }
        }
        
        // If all 26 character frequencies match, we've found a permutation
        if(count === 26) {
            return true;
        }
        
        // If we've reached the end of s2, we're done
        if(right === s2.length - 1) {
            // break;
            return false;
        }
        
        // Slide the window by:
        // 1. Adding the character at the next position (right + 1)
        charSet2[s2[right + 1].charCodeAt(0) - 'a'.charCodeAt(0)]++;
        
        // 2. Removing the character at the current left position
        charSet2[s2[left].charCodeAt(0) - 'a'.charCodeAt(0)]--;
        
        // 3. Moving the left pointer forward
        left++;
    }
    
    // If we've checked all windows and found no permutation, return false
    return false;
}