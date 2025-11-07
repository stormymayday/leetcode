function wordSquares(words: string[]): string[][] {

    const n = words[0].length;

    const res: string[][] = [];

    function helper(matrix: string[]): void {

        // Base Case: Matrix is filled
        if (matrix.length === n) {
            res.push([...matrix]);
            return;
        }

        // how do we get the prefix (it's the reflection column behind the diagonal)
        const prefix: string[] = [];
        for (let row = 0; row < matrix.length; row += 1) {
            // using 'matrix.length' because we are looking for aprefix for the next row
            prefix.push(matrix[row][matrix.length]);
        }

        // need to find a word with a matching prefix
        for (const word of words) {
            if (isPrefixOf(prefix, word)) {

                // try with this word
                matrix.push(word);
                helper(matrix);

                // backtrack
                matrix.pop();
            }

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

function isPrefixOf(prefix: string[], word: string): boolean {
    if (prefix.length > word.length) {
        return false;
    } else {
        for (let i = 0; i < prefix.length; i += 1) {
            if (prefix[i] !== word[i]) {
                return false;
            }
        }
        return true;
    }
}