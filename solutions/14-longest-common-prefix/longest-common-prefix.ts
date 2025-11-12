function longestCommonPrefix(strs: string[]): string {

    // Quick Optimization: if there is only one string
    if (strs.length === 1) {
        return strs[0]; // just return the string (it's own prefix)
    }

    // Phase 1: Populate the Trie
    const root = new TrieNode();
    for (const str of strs) {

        // Edge Case: empty string
        if(str === "") {
            return "";
        }

        // Optimization?
        // If root already has 1 child and current word has a different first character
        // Thus, 'common' prefix is no longer possible
        if (root.children.size === 1 && !root.children.has(str[0])) {
            return ""; // exit early
        }

        // Otherwise, keep inserting
        let curr: TrieNode = root;

        // character by character
        for (let i = 0; i < str.length; i += 1) {
            if (!curr.children.has(str[i])) {
                curr.children.set(str[i], new TrieNode());
            }
            curr = curr.children.get(str[i]);
        }
        curr.isEnd = true;
    }

    // Phase 2: get the common longest prefix
    const res: string[] = [];
    let curr: TrieNode = root;
    // Intuition: keep going down the Trie until there is more than 1 child
    // AND current node is not 'end' of a string
    while (curr.children.size === 1 && curr.isEnd === false) {
        for (const key of curr.children.keys()) {
            res.push(key);
            curr = curr.children.get(key);
        }
    }
    return res.join("");

};

class TrieNode {
    children: Map<string, TrieNode>;
    isEnd: boolean;
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}
