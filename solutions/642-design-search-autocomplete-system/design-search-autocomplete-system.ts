class AutocompleteSystem {

    map: Map<string, number>;
    currInput: string[];
    queryResult: [string, number][];

    constructor(sentences: string[], times: number[]) {

        this.currInput = [];
        this.queryResult = [];
        this.map = new Map();

        for (let i = 0; i < sentences.length; i += 1) {
            this.map.set(sentences[i], times[i]);
        }

    }

    input(c: string): string[] {

        const res: string[] = [];

        if (c === '#') {
            // joining the currInput at the end
            const newSearchTerm: string = this.currInput.join("");
            this.map.set(newSearchTerm, (this.map.get(newSearchTerm) || 0) + 1);
            this.currInput = [];
            this.queryResult = [];
            return res;
        } else {

            this.currInput.push(c);

            // first input, queryResult is empty
            if (this.queryResult.length === 0) {
                for (const [sentence, count] of this.map.entries()) {

                    if (this.isPrefixOf(this.currInput, sentence)) {
                        this.queryResult.push([sentence, count]);
                    }

                }

                // Sort by 'times' descending (larger first), and 'ASCII code' ascending (smaller first)
                // Note: the sort comparator expects a number (negative, zero, or positive).
                this.queryResult.sort((a, b) => {
                    // by 'occurence' first
                    if (a[1] !== b[1]) {
                        return b[1] - a[1]; // (descending) more frequent goes first
                    }
                    // otherwise, if 'occurences' are same, by ASCII code (ascending, smaller code goes first)
                    else {
                        // When a is smaller, it should come first (ascending order)
                        return a[0].localeCompare(b[0]);
                    }
                });

            }
            // subsequent inputs, filter out the queryResult
            else {

                // neet to filter out 'queryResult' based on new input string 
                // note: 'queryResult' is already sorted by count (and ASCII?)
                this.queryResult = this.queryResult.filter(([string, count]) => {
                    return this.isPrefixOf(this.currInput, string);
                });

            }

            // Fill out the result by getting the top three
            for (const [string, count] of this.queryResult) {
                res.push(string);
                if (res.length === 3) {
                    break;
                }
            }

            return res;
        }

    }

    isPrefixOf(prefix: string[], word: string): boolean {
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
}

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */