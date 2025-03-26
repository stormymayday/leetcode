function characterReplacement(s: string, k: number): number {
    // Initialize the result to store the maximum length of valid substring
    let result = 0;

    // Use a Map to keep track of character frequencies in the current window
    const charCount: Map<string, number> = new Map();

    // Left pointer of the sliding window
    let left = 0;

    // Iterate through the string with the right pointer
    for(let right = 0; right < s.length; right++) {
        // Get the current character at the right pointer
        const currentChar = s[right];

        // Update the frequency of the current character in the character count map
        if(!charCount.has(currentChar)) {
            // If the character doesn't exist, set its count to 1
            charCount.set(currentChar, 1);
        } else {
            // If it exists, increment its count by 1
            charCount.set(currentChar, charCount.get(currentChar) + 1);
        }

        // Check if the current window is invalid
        // Window length - max frequency of any character > k (replacement limit)
        // This means we can't make the window valid by replacing k characters
        while((right - left + 1) - Math.max(...charCount.values()) > k) {
            // Reduce the count of the character at the left pointer
            charCount.set(s[left], charCount.get(s[left]) - 1);
            
            // Move the left pointer to shrink the window
            left++;
        }

        // Update the result with the maximum valid window length seen so far
        // This happens after adjusting the window to ensure it's valid
        result = Math.max(result, right - left + 1);
    }

    // Return the length of the longest valid substring
    return result;
}