function findAllConcatenatedWordsInADict(words: string[]): string[] {
    const wordSet = new Set(words);
    const dp = new Map();

    const dfs = (word) => {
        if (dp.has(word)) {
            return dp.get(word);
        }

        for (let i = 1; i < word.length; i++) {
            const prefix = word.substring(0, i);
            const suffix = word.substring(i);

            if (
                (wordSet.has(prefix) && wordSet.has(suffix)) ||
                (wordSet.has(prefix) && dfs(suffix))
            ) {
                dp.set(word, true);
                return true;
            }
        }
        dp.set(word, false);
        return false;
    };

    const res = [];
    for (let w of words) {
        if (dfs(w)) {
            res.push(w);
        }
    }
    return res;
};