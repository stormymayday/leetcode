function prefixCount(words: string[], pref: string): number {

    const trie = new Trie();

    for (const word of words) {
        trie.insert(word);
    }

    let curr: TrieNode | null = trie.root;
    for(let i = 0; i < pref.length; i += 1) {
        if(!curr.children.has(pref[i])) {
            curr = null;
            break;
        }
        curr = curr.children.get(pref[i]);
    }

    if(curr !== null) {
        return curr.wordCount;
    } else {
        return 0;
    }

}

class TrieNode {
    children: Map<string, TrieNode>;
    wordCount: number;
    isWord: boolean;
    constructor() {
        this.children = new Map();
        this.wordCount = 0;
        this.isWord = false;
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
            // curr.wordCount += 1;
            curr = curr.children.get(word[i]);
            // I think we need to increment counter AFTER we move to a node
            curr.wordCount += 1;
        }
        curr.isWord = true;
    }

}
