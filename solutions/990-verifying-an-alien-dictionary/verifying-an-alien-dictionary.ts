function isAlienSorted(words: string[], order: string): boolean {
    for(let i = 1; i < words.length; i += 1) {
        if(compare(words[i - 1], words[i], order) === false) {
            return false;
        }
    }
    return true;
};

function compare(word1, word2, order) {
    const n = Math.min(word1.length, word2.length);
    for(let i = 0; i < n; i += 1) {
        const char1 = word1[i];
        const char2 = word2[i];
        if(char1 !== char2) {
            if(order.indexOf(char1) > order.indexOf(char2)) {
                return false;
            } else {
                return true;
            }
        }
    }
    if(n === word1.length) {
        return true;
    } else {
        return false;
    }
}