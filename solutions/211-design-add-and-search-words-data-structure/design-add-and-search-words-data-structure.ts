class TrieNode {
    children: (TrieNode | null)[];
    isWord: boolean;
    constructor() {
        this.children = new Array(26).fill(null);
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
            const idx = word[i].charCodeAt(0) - "a".charCodeAt(0);
            if(curr.children[idx] === null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        function helper(idx: number, node: TrieNode): boolean {
            if(idx === word.length) {
                return node.isWord;
            }
            if(word[idx] === '.') {
                for(const child of node.children) {
                    if(child !== null) {
                        if(helper(idx + 1, child) === true) {
                            return true;
                        }
                    }
                }
                return false;
            } else {
                const index = word[idx].charCodeAt(0) - "a".charCodeAt(0);
                if(node.children[index] !== null) {
                    return helper(idx + 1, node.children[index]);
                } else {
                    return false;
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