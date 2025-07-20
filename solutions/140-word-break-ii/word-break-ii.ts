function wordBreak(s: string, wordDict: string[]): string[] {
    const res: string[] = [];
    const curr: string[] = [];
    function helper(index: number): void { 
        if(index === s.length) {
            res.push(curr.join(" "));
            return;
        }
        for(let i = 0; i < wordDict.length; i += 1) {
            const subStr = s.substring(index, index + wordDict[i].length);
            if(subStr === wordDict[i]) {
                curr.push(subStr);
                helper(index + subStr.length);
                curr.pop();
            }
        }
    }
    helper(0);
    return res;
};