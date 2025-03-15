function canConstruct(ransomNote: string, magazine: string): boolean {
    // Step 1: Quick check - If ransomNote has more characters than magazine, it's impossible to construct
    if (ransomNote.length > magazine.length) {
        return false;
    }

    // Step 2: Create a frequency map to store the count of each character in magazine
    const frequencyMap: { [key: string]: number } = {};

    for (const char of magazine) {
        if (frequencyMap[char] === undefined) {
            // First occurrence of the character
            frequencyMap[char] = 1;
        } else {
            // Increment count
            frequencyMap[char]++;
        }
    }

    // Step 3: Iterate through ransomNote and check if required characters exist in frequencyMap
    for (const char of ransomNote) {
        if (frequencyMap[char] === undefined) {
            // Character is not in magazine
            return false;
        } else {
            // Use the character
            frequencyMap[char]--;
            if (frequencyMap[char] === 0) {
                // Remove from map if count reaches zero
                delete frequencyMap[char];
            }
        }
    }

    // Step 4: If all characters in ransomNote were found, return true
    return true;
}