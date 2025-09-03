function isAlienSorted(words: string[], order: string): boolean {

    // 1. Create a hash map for faster lookup
    const charIndex = new Map<string, number>();
    for(let i = 0; i < order.length; i += 1) {
        const char = order[i];
        charIndex.set(char, i);
    }

    // 2. Compare two adjacent words char by char
    for(let i = 0; i < words.length - 1; i += 1) {
        const word1 = words[i];
        const word2 = words[i + 1];
        let differenceFound = false;
        for(let j = 0; j < Math.min(word1.length, word2.length); j += 1) {
            const char1 = word1[j];
            const char2 = word2[j];
            if(char1 !== char2) {
                if(charIndex.get(char1) > charIndex.get(char2)) {
                    return false;
                }
                differenceFound = true;
                break;
            }
        }
        if(differenceFound === false && word1.length > word2.length) {
            return false;
        }
    }

    return true;
    
};