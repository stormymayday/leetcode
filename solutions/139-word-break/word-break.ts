function wordBreak(s: string, wordDict: string[], memo: Record<string, boolean> = {}): boolean {

    if(s in memo) {
        return memo[s];
    }

    if(s.length === 0) {
        return true;
    }

    for(let i = 0; i < wordDict.length; i += 1) {
        if(s.startsWith(wordDict[i])) {
            const substr = s.substring(wordDict[i].length);
            if(wordBreak(substr, wordDict, memo) === true) {
                memo[s] = true;
                return true;
            }
        }
    }

    memo[s] = false;
    return false;
};