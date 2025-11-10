function palindromePairs(words: string[]): number[][] {

    const res: number[][] = [];

    const trie = new Trie();
    for (let i = 0; i < words.length; i += 1) {
        trie.insert(words[i], i);
    }

    // Searching for palindrome pairs
    for (let i = 0; i < words.length; i += 1) {

        let curr: TrieNode = trie.root;
        let fullyMatched = true;  // Track if we matched the entire word

        for (let charIdx = 0; charIdx < words[i].length; charIdx += 1) {

            // Case 3 (word 1 is longer: prefix + palindrome + prefix reverse): prefix reverse was found its a complete word
            if (curr.idx !== i && curr.idx !== -1) {
                // Found a complete word in trie, check if rest of current word is palindrome
                if (isPalindrome(words[i], charIdx, words[i].length - 1)) {
                    res.push([i, curr.idx]);
                }
            }

            // characters don't, match
            if (!curr.children.has(words[i][charIdx])) {
                fullyMatched = false;  // Mark as not fully matched
                break;
            }
            // otherwise, keep looking deeper
            else {
                curr = curr.children.get(words[i][charIdx]);
            }

        }

        // Case 1 (reverse) and 2 (word1 is shorter) only come up if whole word was iterated.

        // Only execute Case 1 and 2 if the entire word was matched
        if (fullyMatched) {  // ← Add this condition
            // Case 1: Reverse
            if (
                curr.idx !== -1 &&
                // if word was a palindrome itsef, prevent self pairing
                curr.idx !== i) {
                res.push([i, curr.idx]);
            }

            // Base 2: Word 1 is shorter -> reverse + palindrome + word1
            // grab all the 'palindromeIndices' from the current node
            for (const idx of curr.palindromeIndices) {
                if (i !== idx) {
                    res.push([i, idx]);
                }
            }
        }
    }

    return res;

};

class TrieNode {
    children: Map<string, TrieNode>;
    idx: number;
    palindromeIndices: number[]
    constructor() {
        this.children = new Map();
        this.idx = -1;
        this.palindromeIndices = [];
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }
    insert(word: string, idx: number): void {

        let curr: TrieNode = this.root;
        for (let i = word.length - 1; i >= 0; i -= 1) {
            if (!curr.children.has(word[i])) {
                curr.children.set(word[i], new TrieNode());
            }
            // We need to check if the remaining prefix is a palindrome
            if (isPalindrome(word, 0, i)) {
                curr.palindromeIndices.push(idx);
            }
            curr = curr.children.get(word[i]);
        }
        // storing index of the word on the first character (it's in reverse therefore last node)
        curr.idx = idx;
        // single character is a palindrome 
        // We are on the last node (first character)
        // curr.palindromeIndices.push(idx);

    }
}

function isPalindrome(word: string, left: number, right: number): boolean {
    while (left < right) {
        if (word[left] !== word[right]) {
            return false;
        }
        left += 1;
        right -= 1;
    }
    return true;
}