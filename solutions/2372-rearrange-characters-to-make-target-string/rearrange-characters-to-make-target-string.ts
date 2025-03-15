function rearrangeCharacters(s: string, target: string): number {
    // Initialize result to the length of source string 's'
    // This is the maximum possible copies we could make (will be adjusted down later)
    let result = s.length;

    // Create a frequency map for characters in the 'target' string
    // This tracks how many of each character we need to form one copy of target
    const targetFrequencyMap = {};
    for(const char of target) {
        if(targetFrequencyMap[char] === undefined) {
            // First occurrence of this character
            targetFrequencyMap[char] = 1;
        } else {
            // Increment count for this character
            targetFrequencyMap[char]++;
        }
    }

    // Create a frequency map for characters in the source string 's'
    // But only count characters that are actually needed in the 'target'
    const sFrequencyMap = {};
    for(const char of s) {
        // Only track characters needed in 'target'
        if(targetFrequencyMap[char] !== undefined) {
            if(sFrequencyMap[char] === undefined) {
                // First occurrence of this character
                sFrequencyMap[char] = 1;
            } else {
                // Increment count for this character
                sFrequencyMap[char]++;
            }
        }
    }

    // Calculate how many copies of 'target' can be formed
    for(const key in targetFrequencyMap) {
        // If any required character is missing from source string, we can't form 'target'
        if(sFrequencyMap[key] === undefined) {
            return 0;
        } else {
            // For each character, calculate how many copies it can support
            // Math.floor ensures we get a whole number of copies
            // Math.min finds the limiting character (the one that allows fewest copies)
            result = Math.min(result, Math.floor(sFrequencyMap[key] / targetFrequencyMap[key]));
        }
    }

    // Return the maximum number of complete target strings that can be formed
    return result;
};