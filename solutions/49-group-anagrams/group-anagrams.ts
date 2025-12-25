function groupAnagrams(strs: string[]): string[][] {

    const anagrams = new Map<string, string[]>();

    for(let i = 0; i < strs.length; i += 1) {

        const sorted = strs[i].split("").sort().join("");

        if(!anagrams.has(sorted)) {
            anagrams.set(sorted, []);
        }
        anagrams.get(sorted).push(strs[i]);

    }

    const res: string[][] = [];
    for(const [key, val] of anagrams.entries()) {
        res.push(val);
    }
    return res;
    
};