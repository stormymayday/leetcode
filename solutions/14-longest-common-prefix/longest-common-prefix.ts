function longestCommonPrefix(strs: string[]): string {

    // Phase 1: Count all the prefixes
    const prefixCount = new Map();
    for (const str of strs) {
        const prefixes = getAllPrefixes(str);
        for (const prefix of prefixes) {
            prefixCount.set(prefix, (prefixCount.get(prefix) || 0) + 1);
        }
    }

    // Phase 2: Get the longest prefix
    const res = [""];
    for (const [prefix, count] of prefixCount.entries()) {
        // count must be equal to number of input strings
        if (count === strs.length) {
            if (res[0].length < prefix.length) {
                res[0] = prefix;
            }
        }
    }
    return res[0];

};

function getAllPrefixes(str: string): string[] {
    const prefixes: string[] = [];
    for (let i = 1; i <= str.length; i += 1) {
        prefixes.push(str.slice(0, i));
    }
    return prefixes;
}