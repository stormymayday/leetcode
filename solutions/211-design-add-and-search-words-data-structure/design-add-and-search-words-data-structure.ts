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
        for (let i = 0; i < word.length; i += 1) {
            const charIdx = this.getCharIdx(word[i]);
            if(curr.children[charIdx] === null) {
                curr.children[charIdx] = new TrieNode();
            }
            curr = curr.children[charIdx];
        }
        curr.isWord = true;
    }

    search(word: string): boolean {
        const helper = (idx: number, node: TrieNode): boolean => {
            // Base Case: index goes past the last character
            if (idx === word.length) {
                return node.isWord;
            }

            // character at current index is the wildcard
            if (word[idx] === '.') {
                for (const child of node.children) {
                    if (child !== null) {
                        if (helper(idx + 1, child) === true) {
                            return true;
                        }
                    }

                }
                return false;
            }
            // character at current index is not the wildcard
            else {
                const charIdx = this.getCharIdx(word[idx]);
                if (node.children[charIdx] === null) {
                    return false;
                } else {
                    return helper(idx + 1, node.children[charIdx]);
                }
            }

        }
        return helper(0, this.root);
    }

    getCharIdx(char: string): number {
        return char.charCodeAt(0) - "a".charCodeAt(0);
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */