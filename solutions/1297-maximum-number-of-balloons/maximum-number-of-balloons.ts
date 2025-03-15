function maxNumberOfBalloons(text: string): number {
    // Step 1: Initialize count to infinity to ensure we can find the minimum
    let count = Infinity;

    // Step 2: Create a hash map to store the frequency of characters in 'balloon'
    const hashMap = {
        'b': 0,
        'a': 0,
        'l': 0,
        'o': 0,
        'n': 0,
    };

    // Step 3: Iterate through the input text and count characters that appear in 'balloon'
    for (let char of text) {
        if (hashMap[char] !== undefined) {
            hashMap[char]++;
        }
    }

    // Step 4: Calculate the number of times we can form "balloon" by checking the counts
    for (const key in hashMap) {
        if (key === 'l' || key === 'o') {
            // 'l' and 'o' appear twice in "balloon", so divide their counts by 2
            count = Math.min(count, Math.floor(hashMap[key] / 2));
        } else {
            // For the rest of the characters, take the minimum count
            count = Math.min(count, hashMap[key]);
        }
    }

    // Step 5: Return the number of "balloons" that can be formed
    return count;
}