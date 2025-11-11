function sumPrefixScores(words: string[]): number[] {

    const res: number[] = new Array(words.length).fill(0);

    const trie = new TrieNode();

    // Phase 1: Filling up the Trie
    for(let i = 0; i < words.length; i += 1) {

        let curr = trie;

        for(let j = 0; j < words[i].length; j += 1) {
            if(!curr.children.has(words[i][j])) {
                curr.children.set(words[i][j], new TrieNode());
            }
            curr = curr.children.get(words[i][j]);
            curr.count += 1;
        }
    }
    
    // Phase 2: Getting the count (walk the trie and collect count)
    for(let i = 0; i < words.length; i += 1) {

        let curr = trie;

        for(let j = 0; j < words[i].length; j += 1) {

            if(!curr.children.has(words[i][j])) {
                break;
            } else {
                curr = curr.children.get(words[i][j]);
                res[i] += curr.count;
            }

        }

    }

    return res;
};

class TrieNode {
    children: Map<string, TrieNode>;
    count: number;
    constructor() {
        this.children = new Map();
        this.count = 0;
    }
}