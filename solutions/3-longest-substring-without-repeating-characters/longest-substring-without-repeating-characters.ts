function lengthOfLongestSubstring(s: string): number {

    // Tracks the maximum length found
    let result = 0;

    // Stores last seen index of each character
    const charSeenAtIndex = new Map();

    // Left boundary of the sliding window
    let left = 0;

    for (let right = 0; right < s.length; right++) {

        const currentChar = s[right];

        // If currentChar was seen and is inside the current window
        if (
            charSeenAtIndex.has(currentChar) &&
            charSeenAtIndex.get(currentChar) >= left
        ) {
            // Move left pointer past the last occurrence
            left = charSeenAtIndex.get(currentChar) + 1;
        }

        // Update last seen index of currentChar
        charSeenAtIndex.set(currentChar, right);

        // Calculate window size and update result
        result = Math.max(result, right - left + 1);
    }

    return result;
}