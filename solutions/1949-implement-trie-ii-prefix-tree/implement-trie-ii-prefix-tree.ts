class TrieNode {
    children: Map<string, TrieNode>;
    wordsStartingHere: number; // counts all words passing through this node (for prefix matching)
    wordsEndingHere: number; // counts how many times this exact word was inserted (for exact matching)
    constructor() {
        this.children = new Map();
        this.wordsStartingHere = 0;
        this.wordsEndingHere = 0;
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
            curr.wordsStartingHere += 1;
        }
        curr.wordsEndingHere += 1;
    }

    countWordsEqualTo(word: string): number {
        let curr: TrieNode = this.root;
        for (let i = 0; i < word.length; i += 1) {
            if (!curr.children.has(word[i])) {
                return 0;
            } else {
                curr = curr.children.get(word[i]);
            }
        }
        return curr.wordsEndingHere;
    }

    countWordsStartingWith(prefix: string): number {
        let curr: TrieNode = this.root;
        for (let i = 0; i < prefix.length; i += 1) {
            if (!curr.children.has(prefix[i])) {
                return 0;
            } else {
                curr = curr.children.get(prefix[i]);
            }
        }
        return curr.wordsStartingHere;
    }

    erase(word: string): void {

        function helper(node: TrieNode, idx: number): boolean {
            // Base Case:reached the last character node
            if (idx === word.length) {
                // this is not a complete word
                if (node.wordsEndingHere === 0) {
                    return false;
                }
                // otherwise, this is a complete word
                else {

                    // Need to decrement count
                    node.wordsStartingHere -= 1;
                    node.wordsEndingHere -= 1;

                    // This will send signal to a parent node whether if this child entry should be removed from it's hash map
                    return node.children.size === 0 && node.wordsEndingHere === 0;
                }
            }

            // Recursive Step
            // This word (character) does not exist
            if (!node.children.has(word[idx])) {
                return false;
            }
            // Otherwise, this character exists
            else {

                const shouldRemoveChildEntry: boolean = helper(node.children.get(word[idx]), idx + 1);

                // Child node returns true - meaning we can remove the 'character' entry
                if (shouldRemoveChildEntry === true) {

                    node.children.delete(word[idx]);
                    node.wordsStartingHere -= 1;

                    // if 'wordsStartingHere' from this node becomes zero
                    if(node.wordsStartingHere === 0) {
                        // check if number of children is zero AND wordsEndingHere is zero
                        // If they are, we can delete this node
                        return node.children.size === 0 && node.wordsEndingHere === 0;
                    } else {
                        return false;
                    }

                    // if current's children becomes empty we can delete it as well
                    // return node.children.size === 0;

                } else {

                    node.wordsStartingHere -= 1; // decrement 'prefixes' on the way up
                    return false; // But don't delete this node

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