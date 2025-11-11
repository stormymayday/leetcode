class WordFilter {

    prefixTrie: Trie;
    suffixTrie: Trie;

    constructor(words: string[]) {

        this.prefixTrie = new Trie();
        this.suffixTrie = new Trie();

        for(let idx = 0; idx < words.length; idx += 1) {
            this.prefixTrie.insert(words[idx], idx);
            this.suffixTrie.insert(words[idx].split("").reverse().join(""), idx);
        }
        
    }

    f(pref: string, suff: string): number {
        
        // getting indices for pref & suff (could be empty lists)
        const prefIndices: number[] = this.prefixTrie.startsWith(pref);
        const suffIndices: number[] = this.suffixTrie.startsWith(suff.split("").reverse().join(""));

        // starting from ends of both lists such that largest indices would come first
        let i = prefIndices.length - 1;
        let j = suffIndices.length - 1;
        while(i >= 0 && j >= 0) {

            if(prefIndices[i] === suffIndices[j]) {
                // if values are equal, we found a word that has this prefix & suffix
                return prefIndices[i];
            } else if(prefIndices[i] > suffIndices[j]) {
                // if value at i is larger, decrement 'i'
                i -= 1;
            } else {
                // Otherwise, decrement 'j'
                j -= 1;
            }

        }

        return -1;
        
    }
}

class TrieNode {
    children: Map<string, TrieNode>;
    indices: number[];
    constructor() {
        this.children = new Map();
        this.indices = [];
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }
    insert(word: string, idx: number): void {
        let curr: TrieNode = this.root;
        for(let i = 0; i < word.length; i += 1) {
            if(!curr.children.has(word[i])) {
                curr.children.set(word[i], new TrieNode());
            }
            curr = curr.children.get(word[i]);
            curr.indices.push(idx);
        }
    }
    startsWith(word: string): number[] {
        let curr: TrieNode = this.root;
        for(let i = 0; i < word.length; i += 1) {
            if(!curr.children.has(word[i])) {
                return [];
            }
            curr = curr.children.get(word[i]);
        }
        return curr.indices;
    }
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */