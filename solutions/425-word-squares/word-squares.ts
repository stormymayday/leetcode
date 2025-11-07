function wordSquares(words: string[]): string[][] {

    const n = words[0].length;

    const res: string[][] = [];

    const trie = new Trie();
    for(let i = 0; i < words.length; i += 1) {
        trie.insert(words[i]);
    }

    function helper(matrix: string[]): void {

        // Base Case: Matrix is filled
        if (matrix.length === n) {
            res.push([...matrix]);
            return;
        }

        // This is one of keys for this algorithm: building a prefix
        const prefix: string[] = [];
        for (let row = 0; row < matrix.length; row += 1) {
            // using 'matrix.length' because we are looking for aprefix for the next row
            prefix.push(matrix[row][matrix.length]);
        }

        // check if prefix exists
        let curr: TrieNode = trie.root;
        for(let i = 0; i < prefix.length; i += 1) {
            if(!curr.children.has(prefix[i])) {
                curr = null;
                break;
            } else {
                curr = curr.children.get(prefix[i]);
            }
        }
        if (curr !== null) {

            // dfs for candidates
            const candidates: string[] = [] ;
            function dfs(node: TrieNode): void {
                if(node.isWord) {
                    candidates.push(node.word);
                }
                // this base case is not necessary
                // if(node.children.size === 0) {
                //     return;
                // }
                for(const child of node.children.values()) {
                    dfs(child);
                }
            }
            dfs(curr);

            for (const candidate of candidates) {

                // try with this word
                matrix.push(candidate);
                helper(matrix);

                // backtrack
                matrix.pop();

            }

        }

    }

    // try with every word as a start
    for (const word of words) {
        const matrix: string[] = [];
        matrix.push(word);
        helper(matrix);
    }

    return res;

};

class TrieNode {
    children: Map<string, TrieNode>;
    isWord: boolean;
    word: string;
    constructor() {
        this.children = new Map();
        this.isWord = false;
        this.word = "";
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
        }
        curr.isWord = true;
        curr.word = word;
    }
    search(word: string): boolean {
        let curr: TrieNode = this.root;
        for (let i = 0; i < word.length; i += 1) {
            if (!curr.children.has(word[i])) {
                return false;
            } else {
                curr = curr.children.get(word[i]);
            }
        }
        return curr.isWord;
    }
    startsWith(prefix: string): boolean {
        let curr: TrieNode = this.root;
        for (let i = 0; i < prefix.length; i += 1) {
            if (!curr.children.has(prefix[i])) {
                return false;
            } else {
                curr = curr.children.get(prefix[i]);
            }
        }
        return true;
    }
    delete(word: string): void {
        function helper(idx: number, node: TrieNode): boolean {
            if (idx === word.length) {
                if (node.isWord === false) {
                    return false;
                } else {
                    node.isWord = false;
                    return node.children.size === 0;
                }
            }
            if (!node.children.has(word[idx])) {
                return false;
            } else {
                const shouldDeleteChild = helper(idx + 1, node.children.get(word[idx]));

                if (shouldDeleteChild === true) {
                    node.children.delete(word[idx])
                    return node.children.size === 0;
                } else {
                    return false;
                }
            }
        }
        helper(0, this.root);
    }
}