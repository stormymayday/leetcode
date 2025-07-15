function wordBreak(s: string, wordDict: string[]): string[] {
    const res: string[] = [];
    const curr: string[] = [];
    function helper(index: number): void {
        if(index === s.length) {
            res.push(curr.join(" "));
            return;
        }
        for(let i = 0; i < wordDict.length; i += 1) {
            if(s.substring(index, index + wordDict[i].length) === wordDict[i]) {
                // Choose this word
                curr.push(wordDict[i]);

                // Explore
                helper(index + wordDict[i].length);

                // Backtrack
                curr.pop();
            }
        }
    }
    helper(0);
    return res;
};