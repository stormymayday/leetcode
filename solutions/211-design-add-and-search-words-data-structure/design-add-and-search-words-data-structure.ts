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
        function dfs(idx: number, node: TrieNode): boolean {
            // Base Case: index is at the length
            if(idx === word.length) {
                return node.isWord;
            }
            // character at this index is a wildcard
            if(word[idx] === '.') {
                // try every child of the current node
                for(const child of node.children.values()) {
                    if(dfs(idx + 1, child) === true) {
                        return true; // found the word
                    }
                }
                return false; // did not find the word
            } 
            // character at this index is a regular charater
            else {
                // chec if current node has this character as a child
                if(!node.children.has(word[idx])) {
                    // it doesn't
                    return false;
                } else {
                    // it does, recurse
                    return dfs(idx + 1, node.children.get(word[idx]));
                }
            }

        }
        return dfs(0, this.root);
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */