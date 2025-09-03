function isAlienSorted(words: string[], order: string): boolean {
    // Create index map once for O(1) character lookups
    const charIndex = new Map<string, number>();
    for (let i = 0; i < order.length; i++) {
        charIndex.set(order[i], i);
    }
    
    for (let i = 1; i < words.length; i++) {
        if (!compare(words[i - 1], words[i], charIndex)) {
            return false;
        }
    }
    return true;
}

function compare(word1: string, word2: string, charIndex: Map<string, number>): boolean {
    const minLength = Math.min(word1.length, word2.length);
    
    for (let i = 0; i < minLength; i++) {
        const char1 = word1[i];
        const char2 = word2[i];
        
        if (char1 !== char2) {
            return charIndex.get(char1)! <= charIndex.get(char2)!;
        }
    }
    
    // If all compared characters are equal, shorter word should come first
    return word1.length <= word2.length;
}