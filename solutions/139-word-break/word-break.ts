function wordBreak(s: string, words: string[], i: number = 0, memo: Record<number, boolean> = {}): boolean {
    if(i in memo) {
        return memo[i];
    }

    if(i === s.length) {
        return true;
    }

    for(const word of words) {
        // check if prefix
        if(s.startsWith(word, i)) {
            // Recurse
            if(wordBreak(s, words, i + word.length, memo) === true) {
                memo[i] = true;
                return true;
            }
        }
    }

    memo[i] = false;
    return false;
};