function isAlienSorted(words: string[], order: string): boolean {
    const charIndex = new Map<string, number>();
    for (let i = 0; i < order.length; i += 1) {
        charIndex.set(order[i], i);
    }

    for (let i = 0; i < words.length - 1; i += 1) {

        const word1 = words[i];
        const word2 = words[i + 1];

        let differentCharFound = false;
        for (let j = 0; j < Math.min(word1.length, word2.length); j += 1) {
            const char1 = word1[j];
            const char2 = word2[j];
            if (char1 !== char2) {
                if (charIndex.get(char1) > charIndex.get(char2)) {
                    return false;
                } else {
                    differentCharFound = true;
                    break;
                }
            }

        }

        if (differentCharFound === false && word1.length > word2.length) {
            return false;
        }

    }

    return true;
};