class TrieNode {
    children: (TrieNode | null)[];
    isWord: boolean;
    constructor() {
        this.children = Array(26).fill(null);
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
            const charIdx = this.getCharIdx(word[i]);
            if(curr.children[charIdx] === null) {
                curr.children[charIdx] = new TrieNode();
            }
            curr = curr.children[charIdx];
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        let curr: TrieNode = this.root;
        for(let i = 0; i < word.length; i += 1) {
            const charIdx = this.getCharIdx(word[i]);
            if(curr.children[charIdx] === null) {
                return false;
            } else {
                curr = curr.children[charIdx];
            }
        }
        return curr.isWord;
    }

    startsWith(prefix: string): boolean {
        let curr: TrieNode = this.root;
        for(let i = 0; i < prefix.length; i += 1) {
            const charIdx = this.getCharIdx(prefix[i]);
            if(curr.children[charIdx] === null) {
                return false;
            } else {
                curr = curr.children[charIdx];
            }
        }
        return true;
    }

    private getCharIdx(char: string): number {
        return char.charCodeAt(0) - "a".charCodeAt(0);
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */