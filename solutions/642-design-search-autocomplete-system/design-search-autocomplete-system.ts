class AutocompleteSystem {

    root: TrieNode;
    currNode: TrieNode; // for saving new search
    currInput: string[];
    // searchResult: string[]; // sorted cache

    constructor(sentences: string[], times: number[]) {

        this.root = new TrieNode();
        this.currNode = this.root;
        this.currInput = [];
        // this.searchResult = []; // sorted cache

        // filling the trie
        for (let i = 0; i < sentences.length; i += 1) {
            let curr: TrieNode = this.root;
            // this is going depth wise
            for (let charIdx = 0; charIdx < sentences[i].length; charIdx += 1) {
                if (!curr.children.has(sentences[i][charIdx])) {
                    curr.children.set(sentences[i][charIdx], new TrieNode());
                }
                // move to that new TrieNode
                curr = curr.children.get(sentences[i][charIdx]);
                // fill the map here
                curr.sentencesCountMap.set(sentences[i], times[i]);
            }
        }

    }

    input(c: string): string[] {

        const res: string[] = [];

        // end of an input
        if (c === '#') {
            this.resetSearch();
            // return [];
            return res;
        }
        // otherwise, it's an input
        else {

            this.currInput.push(c);

            // Check if already in dead state
            if (this.currNode === null) {
                return [];
            }

            // no matches
            if (!this.currNode.children.has(c)) {
                // Mark as dead to prevent accidental matches until # is entered?
                this.currNode = null;
                return [];
            } else {

                this.currNode = this.currNode.children.get(c);

                const sentencesAndCounts: [string, number][] = [];

                // this contains all the sentences with current prefix
                for (const [sentence, count] of this.currNode.sentencesCountMap.entries()) {
                    sentencesAndCounts.push([sentence, count]);
                }

                // need to sort them
                sentencesAndCounts.sort((a, b) => {
                    // by count (desc)
                    if (a[1] !== b[1]) {
                        return b[1] - a[1];
                    }
                    // by ASCII (ascending)
                    else {
                        return a[0].localeCompare(b[0]);
                    }
                });

                for (const [sentence, count] of sentencesAndCounts) {
                    res.push(sentence);
                    if (res.length === 3) {
                        break;
                    }
                }

            }

        }

        return res;

    }

    saveLatestSearch(str: string): void {
        let curr: TrieNode = this.root;
        for (let i = 0; i < str.length; i += 1) {
            if (!curr.children.has(str[i])) {
                // create an entry in the hash map
                curr.children.set(str[i], new TrieNode());
            }
            // move to that node
            curr = curr.children.get(str[i]);
            // add sentence and count
            curr.sentencesCountMap.set(str, (curr.sentencesCountMap.get(str) || 0) + 1);
        }
    }

    resetSearch(): void {
        const latestSearch = this.currInput.join("");
        this.currInput = [];
        if (latestSearch.length > 0) {  // Only save non-empty
            this.saveLatestSearch(latestSearch);
        }
        this.currNode = this.root;
    }
}

class TrieNode {
    children: Map<string, TrieNode>;
    sentencesCountMap: Map<string, number>;
    constructor() {
        this.children = new Map();
        this.sentencesCountMap = new Map();
    }
}

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */