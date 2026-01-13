class WordDictionary {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let curr = this.root;
        for (let i = 0; i < word.length; i += 1) {
            if (curr.children[word[i]] === undefined) {
                curr.children[word[i]] = new TrieNode();
            }
            curr = curr.children[word[i]];
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        function helper(node: TrieNode, idx: number): boolean {
            if (idx === word.length) {
                return node.isWord;
            }

            if (word[idx] === '.') {

                for (const childNode of Object.values(node.children)) {
                    if (helper(childNode, idx + 1)) {
                        return true;
                    }
                }

                return false;

            } else {
                if (node.children[word[idx]] === undefined) {
                    return false;
                } else {
                    return helper(node.children[word[idx]], idx + 1);
                }
            }

        }
        return helper(this.root, 0);
    }
}

class TrieNode {
    children: Record<string, TrieNode>;
    isWord: boolean;
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */