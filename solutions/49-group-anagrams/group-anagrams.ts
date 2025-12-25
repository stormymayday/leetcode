function groupAnagrams(strs: string[]): string[][] {

    const anagrams = new Map<string, string[]>();

    for(let i = 0; i < strs.length; i += 1) {

        const currStr = strs[i];
        const charCount = new Array(26).fill(0);
        for(let j = 0; j < currStr.length; j += 1) {
            const charIdx = currStr[j].charCodeAt(0) - 'a'.charCodeAt(0);
            charCount[charIdx] += 1;
        }

        const key = charCount.join('#');

        if(!anagrams.has(key)) {
            anagrams.set(key, []);
        }

        anagrams.get(key).push(currStr);

    }

    const res: string[][] = [];
    for(const group of anagrams.values()) {
        res.push(group);
    }
    return res;

    
};