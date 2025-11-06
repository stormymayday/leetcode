class AutocompleteSystem {

    map: Map<string, number>;
    currInput: string;

    constructor(sentences: string[], times: number[]) {

        this.currInput = "";
        this.map = new Map();

        for (let i = 0; i < sentences.length; i += 1) {
            this.map.set(sentences[i], times[i]);
        }

    }

    input(c: string): string[] {

        const res: string[] = [];

        if (c === '#') {
            this.map.set(this.currInput, (this.map.get(this.currInput) || 0) + 1);
            this.currInput = "";
            return res;
        } else {

            this.currInput += c;

            const allMatches: [string, number][] = [];

            for (const [sentence, count] of this.map.entries()) {

                if (this.isPrefixOf(this.currInput, sentence)) {
                    allMatches.push([sentence, count]);
                }

            }

            // Sort by 'times' descending (larger first)?, and 'ASCII code' ascending (smaller first)?
            allMatches.sort((a, b) => {
                // by 'occurence' first
                if (a[1] !== b[1]) {
                    return b[1] - a[1]; // descending?
                }
                // otherwise, by ASCII code
                else {
                    return a[0].localeCompare(b[0]);
                }
            });

            for (const [string, count] of allMatches) {
                res.push(string);
            }

            while (res.length > 3) {
                res.pop();
            }

            return res;
        }

    }

    isPrefixOf(prefix: string, word: string): boolean {
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