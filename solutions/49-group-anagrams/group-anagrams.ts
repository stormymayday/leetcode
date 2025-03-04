function groupAnagrams(strs: string[]): string[][] {
    // Object to store anagram groups
    const hashMap = {};
    // Iterate through each string in the input array
    for(const string of strs) {
        // Sort the characters of the string
        // This creates a key for anagrams
        const sorted = string.split('').sort().join('');
        // If no group exists for this sorted string, create an empty array
        if(hashMap[sorted] === undefined) {
            hashMap[sorted] = [];
        }
        // Add the original string to its corresponding anagram group
        hashMap[sorted].push(string);
    }
    // Return an array of all anagram groups
    return Object.values(hashMap);

};