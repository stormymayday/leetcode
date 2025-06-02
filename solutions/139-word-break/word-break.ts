function wordBreak(s: string, wordDict: string[], memo: Record<string, boolean> = {}): boolean {
    // Base Case: memo fetching
    if(s in memo) {
        return memo[s];
    }
    
    // Base Case: Empty String
    if(s === '') {
        return true;
    }

    // Recursive Step
    for(const word of wordDict) {
        // Check if the word is a prefix of s
        if(s.startsWith(word) === true) {
            // Create a suffix using that word
            const suffix = s.slice(word.length);
            // Make a recursive call using the suffix
            if(wordBreak(suffix, wordDict, memo) === true) {
                memo[s] = true;
                return true;
            }
        }
    }

    memo[s] = false;
    return false;
};