function countPrefixSuffixPairs(words: string[]): number {
    let count = 0;

    for (let i = 0; i < words.length - 1; i += 1) {
        for (let j = i + 1; j < words.length; j += 1) {
            if (isPrefixAndSuffix(words[i], words[j]) === true) {
                count += 1;
            }
        }
    }

    return count;
};

function isPrefixAndSuffix(word1: string, word2: string): boolean {

    if (word1.length > word2.length) {
        return false;
    }

    let start = 0;
    let end1 = word1.length - 1;
    let end2 = word2.length - 1;
    while (start < word1.length || end1 >= 0) {

        if (start < word1.length) {
            if (word1[start] !== word2[start]) {
                return false;
            } else {
                start += 1;
            }
        }

        if (end1 >= 0) {
            if (word1[end1] !== word2[end2]) {
                return false;
            } else {
                end1 -= 1;
                end2 -= 1;
            }
        }

    }

    return true;

}