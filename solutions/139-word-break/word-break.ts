function wordBreak(s: string, wordDict: string[], index: number = 0, memo: Record<number, boolean> = {}): boolean {

    if(index in memo) {
        return memo[index];
    }

    if(index === s.length) {
        return true;
    }

    for(let i = 0; i < wordDict.length; i += 1) {
        if(s.startsWith(wordDict[i], index)) {
            if(wordBreak(s, wordDict, index + wordDict[i].length, memo) === true) {
                memo[index] = true;
                return true;
            }
        }
    }

    memo[index] = false;
    return false;
};