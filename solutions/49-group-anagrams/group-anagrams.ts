function groupAnagrams(strs: string[]): string[][] {
    // Object to store grouped anagrams
    const hashMap = {};
    // Iterate through each string in the input array
    for(const string of strs) {
        // Create a count array to track character frequencies
        // Array of 26 zeros representing a-z
        const charFrequencyCount = new Array(26).fill(0);
        // Count the frequency of each character in the string
        for(const char of string) {
            // Get the character code by subracting charater code of 'a'
            const charCode = char.charCodeAt(0) - 'a'.charCodeAt(0);
            // Increment the count for that character code
            charFrequencyCount[charCode] += 1;
        }
        // Create a key by joining the charFrequencyCount array
        // Using '#' as a separator in the key prevents accidental merging of different frequency arrays (e.g., 10,1 vs. 1,0,1).
        const key = charFrequencyCount.join('#');
        // If the key doesn't exist in the result object, create an empty array
        if(hashMap[key] === undefined) {
            hashMap[key] = [];
        }
        // Add the current string to its anagram group
        hashMap[key].push(string);

    }
    // Return the values (grouped anagram arrays) from the result object
    return Object.values(hashMap);
    
};