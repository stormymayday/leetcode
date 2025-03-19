function indexOfChar(char: string): number {
    return char.charCodeAt(0) - 'A'.charCodeAt(0);
}

function characterReplacement(s: string, k: number): number {
    let result = 0;
    const sCount = new Array(26).fill(0);
    let left = 0;
    let right = 0;
    
    while (right < s.length) {
        // Check if adding the next character would make window valid
        // We temporarily add it to check
        sCount[indexOfChar(s[right])]++;
        const currentMaxFreq = Math.max(...sCount);
        
        if ((right - left + 1) - currentMaxFreq <= k) {
            // Valid after adding, update result and move right
            result = Math.max(result, right - left + 1);
            right++;
        } else {
            // Invalid after adding, remove it and move left
            sCount[indexOfChar(s[right])]--;  // Remove the character we temporarily added
            sCount[indexOfChar(s[left])]--;  // Remove the leftmost character
            left++;
        }
    }
    
    return result;
}