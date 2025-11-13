class WordDictionary {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let curr: TrieNode = this.root;
        for (let i = 0; i < word.length; i += 1) {
            if (!curr.children.has(word[i])) {
                curr.children.set(word[i], new TrieNode());
            }
            curr = curr.children.get(word[i]);
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        function helper(node: TrieNode, idx: number): boolean {
            if (idx === word.length) {
                return node.isWord;
            }

            if (word[idx] === '.') {

                for(const childNode of node.children.values()) {
                    if(helper(childNode, idx + 1)) {
                        return true;
                    }
                }

                return false; 

            } else {
                if (!node.children.has(word[idx])) {
                    return false;
                } else {
                    return helper(node.children.get(word[idx]), idx + 1);
                }
            }

        }
        return helper(this.root, 0);
    }
}

class TrieNode {
    children: Map<string, TrieNode>;
    isWord: boolean;
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */