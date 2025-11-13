class TrieNode {
    children: Map<string, TrieNode>;
    prefixCount: number;
    wordCount: number;
    constructor() {
        this.children = new Map();
        this.prefixCount = 0;
        this.wordCount = 0;
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let curr: TrieNode = this.root;
        for (let i = 0; i < word.length; i += 1) {
            if (!curr.children.has(word[i])) {
                curr.children.set(word[i], new TrieNode());
            }
            curr = curr.children.get(word[i]);
            curr.prefixCount += 1;
        }
        curr.wordCount += 1;
    }

    countWordsEqualTo(word: string): number {
        let curr: TrieNode = this.root;
        for (let i = 0; i < word.length; i += 1) {
            if (!curr.children.has(word[i])) {
                return 0;
            }
            curr = curr.children.get(word[i]);
        }
        return curr.wordCount;
    }

    countWordsStartingWith(prefix: string): number {
        let curr: TrieNode = this.root;
        for (let i = 0; i < prefix.length; i += 1) {
            if (!curr.children.has(prefix[i])) {
                return 0;
            }
            curr = curr.children.get(prefix[i]);
        }
        return curr.prefixCount;
    }

    erase(word: string): void {

        function helper(node: TrieNode, idx: number): boolean {

            // Base Case: reached the last node
            if(idx === word.length) {
                if(node.wordCount === 0) {
                    return false; // not a target word
                } else {
                    node.wordCount -= 1;
                    node.prefixCount -= 1;
                    return node.children.size === 0 && node.wordCount === 0;
                }
            }

            // Recursive Step

            if(!node.children.has(word[idx])) {
                return false;  // not a target word
            } else {

                const shouldDeleteChildEntry = helper(node.children.get(word[idx]), idx + 1);

                if(shouldDeleteChildEntry === true) {
                    
                    node.children.delete(word[idx]);
                    node.prefixCount -= 1;

                    if(node.prefixCount === 0) {
                        return node.children.size === 0 && node.wordCount === 0;
                    } else {
                        return false;
                    }

                } else {
                    
                    // shouldDeleteChildEntry === false
                    node.prefixCount -= 1;
                    return false;

                }

            }

        }
        helper(this.root, 0);
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.countWordsEqualTo(word)
 * var param_3 = obj.countWordsStartingWith(prefix)
 * obj.erase(word)
 */