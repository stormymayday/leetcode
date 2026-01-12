class TrieNode {
    children: Record<string, TrieNode>;
    isWord: boolean;
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let curr = this.root;
        for(let i = 0; i < word.length;  i+= 1) {
            const currChar = word[i];
            if(curr.children[currChar] === undefined) {
                curr.children[currChar] = new TrieNode();
            }
            curr = curr.children[currChar];
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        let curr = this.root;
        for(let i = 0; i < word.length; i += 1) {
            const currChar = word[i];
            if(curr.children[currChar] === undefined) {
                return false;
            }
            curr = curr.children[currChar];
        }
        return curr.isWord;
    }

    startsWith(prefix: string): boolean {
        let curr = this.root;
        for(let i = 0; i < prefix.length; i += 1) {
            const currChar = prefix[i];
            if(curr.children[currChar] === undefined) {
                return false;
            }
            curr = curr.children[currChar];
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