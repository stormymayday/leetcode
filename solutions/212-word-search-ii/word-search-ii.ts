function findWords(board: string[][], words: string[]): string[] {

    const res = new Set<string>();
    const trie = new Trie();
    for (let i = 0; i < words.length; i += 1) {
        trie.insert(words[i]);
    }

    for (let row = 0; row < board.length; row += 1) {
        for (let col = 0; col < board[0].length; col += 1) {
            if (trie.root.children.has(board[row][col])) {
                dfs(board, row, col, [], res, trie);
            }
        }
    }

    return Array.from(res);

};

function dfs(board: string[][], row: number, col: number, path: string[], res: Set<string>, trie: Trie): void {
    // Base Case: out of bounds
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
        return;
    }

    // Base Case: visited
    if (board[row][col] === '#') {
        return;
    }

    // add current char to path and mark position as visited
    path.push(board[row][col]);
    const temp = board[row][col];
    board[row][col] = '#';
    const prefix = path.join("");

    // Base Case: not a prefix
    if (trie.startsWith(prefix) === false) {
        // backtrack
        path.pop();
        board[row][col] = temp;
        return;
    }

    // Found a word
    if (trie.search(prefix) === true) {
        res.add(prefix);
        trie.delete(prefix);
        // don't return yet
    }

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1] // left
    ];
    for (const [rowDelta, colDelta] of directions) {
        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;
        dfs(board, neighborRow, neighborCol, path, res, trie);
    }

    // explored all directions from current position, backtrack
    path.pop();
    board[row][col] = temp;
}

class TrieNode {
    children: Map<string, TrieNode>;
    isWord: boolean;
    constructor() {
        this.children = new Map();
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
            curr = curr.children.get(word[i]);
        }
        curr.isWord = true;
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

        // Returns true if parent should delete the mapping
        function helper(node: TrieNode, word: string, index: number): boolean {
            // Base case: reached end of word
            if (index === word.length) {
                // Word doesn't exist
                if (!node.isWord) {
                    return false;
                } else {
                    // Unmark as word
                    node.isWord = false;
                    // Return true if node has no children (can be deleted)
                    return node.children.size === 0;
                }
            }

            const char = word[index];
            const childNode = node.children.get(char);

            // Character path doesn't exist
            if (childNode === undefined) {
                return false;
            } else {
                // Recursively delete from child
                const shouldDeleteChild = helper(childNode, word, index + 1);

                // If child should be deleted, remove the mapping
                if (shouldDeleteChild) {
                    node.children.delete(char);
                    // Return true if current node can also be deleted
                    // (has no children and is not end of another word)
                    return node.children.size === 0;
                } 

                return false;
            }
        }

        helper(this.root, word, 0);
    }
}