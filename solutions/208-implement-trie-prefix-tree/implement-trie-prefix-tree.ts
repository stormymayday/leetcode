class TrieNode {
    children: (TrieNode | null)[];
    isWord: boolean;
    constructor() {
        this.children = new Array(26).fill(null);
        this.isWord = false;
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
            const idx = word[i].charCodeAt(0) - "a".charCodeAt(0);
            if(curr.children[idx] === null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        let curr: TrieNode = this.root;
        for(let i = 0; i < word.length; i += 1) {
            const idx = word[i].charCodeAt(0) - "a".charCodeAt(0);
            if(curr.children[idx] === null) {
                return false;
            } else {
                curr = curr.children[idx];
            }
        }
        return curr.isWord;
    }

    startsWith(prefix: string): boolean {
        let curr: TrieNode = this.root;
        for(let i = 0; i < prefix.length; i += 1) {
            const idx = prefix[i].charCodeAt(0) - "a".charCodeAt(0);
            if(curr.children[idx] === null) {
                return false;
            } else {
                curr = curr.children[idx];
            }
        }
        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */