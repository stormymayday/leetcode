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

            // Sort by 'times' descending (larger first), and 'ASCII code' ascending (smaller first)
            allMatches.sort((a, b) => {
                // by 'occurence' first
                if (a[1] !== b[1]) {
                    return b[1] - a[1]; // (descending) more frequent goes first
                }
                // otherwise, by ASCII code (ascending, smaller ASCII code goes first)
                else {
                    // Note: the sort comparator expects a number (negative, zero, or positive).
                    // When a is smaller, it should come first (ascending order)
                    if(a[0] < b[0]) {
                        return -1;
                    } 
                    // When a is larger, it should come after b
                    // else if(a[0] > b[0]) {
                    //     return 1;
                    // } 
                    // a and b are equal
                    else {
                        // no change
                        return 0;
                    }
                }
            });

            // Fill out the result

            for (const [string, count] of allMatches) {
                res.push(string);
                if(res.length === 3) {
                    break;
                }
            }

            // Note: not sure about: "If there are fewer than 3 matches, return them all." requirement
            
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