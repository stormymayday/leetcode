function wordSquares(words: string[]): string[][] {

    const n = words[0].length;

    const res: string[][] = [];

    const prefixHashTable = buildPrefixHashTable(words);

    function helper(matrix: string[]): void {

        // Base Case: Matrix is filled
        if (matrix.length === n) {
            res.push([...matrix]);
            return;
        }

        // This is one of keys for this algorithm: building a prefix
        const prefix: string[] = [];
        for (let row = 0; row < matrix.length; row += 1) {
            // using 'matrix.length' because we are looking for aprefix for the next row
            prefix.push(matrix[row][matrix.length]);
        }

        // Using prefix to fetch candidate words
        const candidates = prefixHashTable.get(prefix.join(""));
        // Try every candidate
        for (const candidate of candidates || []) {

            // try with this word
            matrix.push(candidate);
            helper(matrix);

            // backtrack
            matrix.pop();

        }

    }

    // try with every word as a start
    for (const word of words) {
        const matrix: string[] = [];
        matrix.push(word);
        helper(matrix);
    }

    return res;

};

function buildPrefixHashTable(words: string[]): Map<string, string[]> {

    const prefixHashTable = new Map();

    for (let i = 0; i < words.length; i += 1) {

        let prefix: string = "";

        for (let charIdx = 0; charIdx < words[i].length; charIdx += 1) {

            prefix += words[i][charIdx];

            if (!prefixHashTable.has(prefix)) {
                prefixHashTable.set(prefix, []);
            }
            prefixHashTable.get(prefix).push(words[i]);

        }

    }

    return prefixHashTable;

}