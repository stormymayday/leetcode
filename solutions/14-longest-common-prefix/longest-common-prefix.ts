function longestCommonPrefix(strs: string[]): string {
    
    // Cheeky Edge Case: Single Word
    if (strs.length === 1) {
        return strs[0];
    }

    let res = [];

    for (let i = 0; i < strs.length - 1; i += 1) {

        const str1 = strs[i];
        const str2 = strs[i + 1];

        // If first chars don't match, exit early, there can't be a common prefix
        if (str1[0] !== str2[0]) {
            return "";
        }

        // Get the common prefix of these two words (This is quadratic due to outer loop)
        let currPrefix = [];
        for (let j = 0; j < Math.min(str1.length, str2.length); j += 1) {
            if (str1[j] !== str2[j]) {
                break;
            } else {
                currPrefix.push(str1[j]);
            }
        }

        // Now update the result
        // If we compare by min size, res (starts empty) will always be smaller
        // it can only get smaller?
        if (res.length === 0 || res.length > currPrefix.length) {
            res = currPrefix;
        }

    }

    return res.join("");
};