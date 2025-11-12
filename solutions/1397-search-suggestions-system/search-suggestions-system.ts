function suggestedProducts(products: string[], searchWord: string): string[][] {

    const trie = new Trie();

    const sortedProducts: string[] = [...products.sort()];

    for(const product of sortedProducts) {
        trie.insert(product);
    }

    // even if the input is not in the trie
    // expected result is an empty array of size input word
    const res: string[][] = new Array(searchWord.length).fill([]);

    let curr: TrieNode = trie.root;
    for(let charIdx = 0; charIdx < searchWord.length; charIdx += 1) {

        if(!curr.children.has(searchWord[charIdx])) {
            break;
        } else {
            curr = curr.children.get(searchWord[charIdx]);
            if(curr.words.length > 3) {
                res[charIdx] = curr.words.slice(0, 3);
            } else {
                res[charIdx] = curr.words;
            }
            
        }     

    }

    return res;

};

class TrieNode {
    children: Map<string, TrieNode>;
    words: string[];
    constructor() {
        this.children = new Map();
        this.words = [];
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }
    insert(word: string): void {
        let curr: TrieNode = this.root;
        for(let i = 0; i < word.length; i += 1) {
            if(!curr.children.has(word[i])) {
                curr.children.set(word[i], new TrieNode);
            }
            curr = curr.children.get(word[i]);
            curr.words.push(word);
            // curr.words.sort();
        }
    }
}