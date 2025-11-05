class TrieNode {
    children: Map<string, TrieNode>;
    isWord: boolean;
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}

class WordDictionary {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let curr: TrieNode = this.root;
        for(let i = 0; i < word.length; i += 1) {
            if(!curr.children.has(word[i])) {
                curr.children.set(word[i], new TrieNode());
            }
            curr = curr.children.get(word[i]);
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        function helper(idx: number, node: TrieNode): boolean {
            // Base Case: index goes past the last character
            if(idx === word.length) {
                return node.isWord;
            }

            // character at current index is the wildcard
            if(word[idx] === '.') {
                for(const [character, trieNode] of node.children.entries()) {
                    if(helper(idx + 1, trieNode) === true) {
                        return true;
                    }
                }
                return false;
            } 
            // character at current index is not the wildcard
            else {
                if(!node.children.has(word[idx])) {
                    return false;
                } else {
                    return helper(idx + 1, node.children.get(word[idx]));
                }
            }

        }
        return helper(0, this.root);
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */