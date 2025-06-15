function wordBreak(s: string, wordDict: string[], index: number = 0, memo: Record<number, boolean> = {}): boolean {
    
    if(index in memo) {
        return memo[index];
    }

    // Base Case: index reaches the end
    if(index === s.length) {
        return true;
    }

    for(const word of wordDict) {
        // check if word is a prefix
        if(s.startsWith(word, index)) {
            if(wordBreak(s, wordDict, index + word.length, memo) === true) {
                memo[index] = true;
                return true;
            }
        }
    }

    memo[index] = false;
    return false;
};