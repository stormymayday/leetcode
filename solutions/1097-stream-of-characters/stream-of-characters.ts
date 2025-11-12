class StreamChecker {
    suffixTrie: Trie;
    charStream: string[];
    constructor(words: string[]) {
        this.suffixTrie = new Trie();
        this.charStream = [];
        for(const word of words) {
            this.suffixTrie.insert(word);
        }
    }

    query(letter: string): boolean {
        this.charStream.push(letter);
        return this.suffixTrie.suffixSearch(this.charStream);
    }
}

class TrieNode {
    children: Map<string, TrieNode>;
    isEnd: boolean
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }
    // Inserting in reverse to match word suffixes
    insert(word: string): void {
        let curr: TrieNode = this.root;
        for(let i = word.length - 1; i >= 0; i -= 1) {
            if(!curr.children.has(word[i])) {
                curr.children.set(word[i], new TrieNode());
            }
            curr = curr.children.get(word[i]);
        }
        curr.isEnd = true;
    }
    // Search is also in reverse
    suffixSearch(charStream: string[]): boolean {
        let curr: TrieNode = this.root;
        for(let i = charStream.length - 1; i >= 0; i -= 1) {
            if(!curr.children.has(charStream[i])) {
                return false;
            } else {
                curr = curr.children.get(charStream[i]);
                // was missing this
                // if an end is found during traversal
                // return true immediately because it must be a suffix
                if(curr.isEnd === true) {
                    return true;
                }
            }
        }
        // this return is still needed
        // if we get to the end of charStream but this char is 'end' of any word
        // then no word is currently a suffix of charStream
        // return curr.isEnd;
        return false; // Therefore, is more accurate
    }
}

/**
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */