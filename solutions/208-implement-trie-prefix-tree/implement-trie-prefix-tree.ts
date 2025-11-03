class TrieNode {
    children: Map<string, TrieNode>;
    isWord: boolean;
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}
class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        // start pointer at root
        let curr: TrieNode = this.root;
        // iterate over each character of the input word
        for(let i = 0; i < word.length; i += 1) {
            // if 'curr' doesn't have the character in it's children hash map
            if(!curr.children.has(word[i])) {
                // create it
                curr.children.set(word[i], new TrieNode());
            }
            // move 'curr' to that node
            curr = curr.children.get(word[i]);

        }
        // mark last character as the end
        curr.isWord = true;   
    }

    search(word: string): boolean {
        let curr: TrieNode = this.root;
        for(let i = 0; i < word.length; i += 1) {
            if(!curr.children.has(word[i])) {
                return false;
            } else {
                curr = curr.children.get(word[i]);
            }
        }
        return curr.isWord;
    }

    startsWith(prefix: string): boolean {
        let curr: TrieNode = this.root;
        for(let i = 0; i < prefix.length; i += 1) {
            if(!curr.children.has(prefix[i])) {
                return false;
            } else {
                curr = curr.children.get(prefix[i]);
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