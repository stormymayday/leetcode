function findWords(board: string[][], words: string[]): string[] {

    // Phase 1: Constructing Trie
    const root = new TrieNode();
    for (let i = 0; i < words.length; i += 1) {
        let curr: TrieNode = root;
        for (let j = 0; j < words[i].length; j += 1) {
            if (!curr.children.has(words[i][j])) {
                curr.children.set(words[i][j], new TrieNode());
            }
            curr = curr.children.get(words[i][j]);
        }
        curr.isWord = true;
        curr.word = words[i];
    }

    // Phase 2: Scanning board for matching first characters on the root
    const res: string[] = [];
    for (let row = 0; row < board.length; row += 1) {
        for (let col = 0; col < board[0].length; col += 1) {
            // Run DFS
            if (root.children.has(board[row][col])) {
                matrixDFS(board, row, col, root, res, new Set<string>());
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
        nextNode.isWord = false; // unmarking the word to avoid duplicates
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