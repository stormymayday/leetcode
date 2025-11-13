function findWords(board: string[][], words: string[]): string[] {

    // Phase 1: Constructing Trie
    const trie = new Trie();
    for (let i = 0; i < words.length; i += 1) {
        trie.insert(words[i]);
    }

    // Phase 2: Scanning board for matching first characters on the root
    const res: string[] = [];
    for (let row = 0; row < board.length; row += 1) {
        for (let col = 0; col < board[0].length; col += 1) {
            // Run DFS
            if (trie.root.children.has(board[row][col])) {
                matrixDFS(board, row, col, trie.root, trie, res, new Set<string>());
            }
        }
    }
    return res;

};

function matrixDFS(
    board: string[][],
    row: number,
    col: number,
    node: TrieNode,
    trie: Trie,
    res: string[],
    visited: Set<string>
): void {

    // Base Case: out of bounds
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
        return;
    }

    const position = `${row},${col}`;
    const char = board[row][col];

    // Base Case: visited
    if (visited.has(position) || !node.children.has(char)) {
        return;
    }

    visited.add(position);

    const nextNode = node.children.get(char);

    if (nextNode.isWord === true) {
        res.push(nextNode.word);
        trie.delete(nextNode.word); // delete the word from trie
        // Prevents duplicates
    }

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for (const [rowDelta, colDelta] of directions) {
        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;
        matrixDFS(
            board,
            neighborRow,
            neighborCol,
            nextNode,
            trie,
            res,
            visited
        );
    }

    // backtrack
    visited.delete(position);

}

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

        // Returns true if parent should delete the mapping
        function helper(node: TrieNode, word: string, index: number): boolean {
            // Base case: reached end of word
            if (index === word.length) {
                // Word doesn't exist
                if (node.isWord === false) {
                    return false;
                } 
                // Otherwise, the word exists and it can be deleted
                else {
                    // Unmark the word (Essentially deleting it from the Trie)
                    node.isWord = false;
                    // Furthermore, if node has no children, we can delete the mapping from the parent
                    return node.children.size === 0;
                }
            }

            // get character at current index
            const char = word[index];
            // check if current node has character as a child
            const childNode = node.children.get(char);

            // current node doesn't have character as a child
            if (childNode === undefined) {
                return false;
            } 
            // current node has character as a child
            else {
                // Recursively delete from child
                const shouldDeleteChild = helper(childNode, word, index + 1);

                // If child should be deleted, remove the mapping from current node
                if (shouldDeleteChild) {
                    node.children.delete(char);
                    // If current's children map becomes empty we can delete it aswell
                    return node.children.size === 0;
                } 
                // Otherwise, 'shouldDeleteChild' is false
                else {
                    // Therefore, explicitly return false
                    // indicating that current node should not be deleted
                    return false;
                }
            }
        }

        helper(this.root, word, 0);
    }
}