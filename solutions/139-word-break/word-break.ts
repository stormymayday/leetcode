function wordBreak(s: string, wordDict: string[], i:number = 0, memo: Record<string, boolean> = {}): boolean {
    // Base Case: memo fetching
    if(i in memo) {
        return memo[i];
    }
    
    // Base Case: Empty String
    if(i === s.length) {
        return true;
    }

    // Recursive Step
    for(const word of wordDict) {
        // Check if the word (at the current index i) is a prefix of s
        if(s.startsWith(word, i) === true) {
            // Make a recursive call shifting the index past the word length
            if(wordBreak(s, wordDict, i + word.length, memo) === true) {
                memo[i] = true;
                return true;
            }
        }
    }

    memo[i] = false;
    return false;
};