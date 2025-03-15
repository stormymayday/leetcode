function maxNumberOfBalloons(text: string): number {
    // Initialize result to the length of text, which is the maximum possible count
    // (This will be adjusted down as we check each character's frequency)
    let result = text.length;

    // Define the frequency of each character needed to form "balloon"
    // 'b', 'a', and 'n' appear once, while 'l' and 'o' appear twice
    const ballon = {
        'b': 1,
        'a': 1,
        "l": 2,
        "o": 2,
        "n": 1,
    };

    // Create a hash map to count occurrences of required characters in the input text
    const hashMap = {};
    for(const char of text) {
        // Only track characters that are in "balloon"
        if(ballon[char]) {
            if(hashMap[char] !== undefined) {
                // Increment count for existing character
                hashMap[char]++;
            } else {
                // Initialize count for new character
                hashMap[char] = 1;
            }
        }
    }

    // Check if we can form "balloon" and determine how many can be formed
    for(const key in ballon) {
        // If any required character is missing, we can't form "balloon"
        if(hashMap[key] === undefined) {
            return 0;
        } else {
            // Calculate how many times this specific character can be used
            // by dividing its occurrence count by how many are needed per "balloon"
            // Use Math.floor to get a whole number and Math.min to find the limiting character
            result = Math.min(result, Math.floor(hashMap[key]/ballon[key]));
        }
    }

    // Return the maximum number of complete "balloon" words that can be formed
    return result;
};