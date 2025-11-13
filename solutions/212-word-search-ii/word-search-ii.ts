function findWords(board: string[][], words: string[]): string[] {
    
    const root = new TrieNode();

    // Build trie
    for (const word of words) {
        let curr: TrieNode = root;
        for (const char of word) {
            if (!curr.children.has(char)) {
                curr.children.set(char, new TrieNode());
            }
            curr = curr.children.get(char)!;
        }
        curr.isWord = true;
        curr.word = word; // Store the word at the end node
    }

    // const res: string[] = [];
    const found = new Set<string>(); // Prevent duplicates

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            if (root.children.has(board[row][col])) {
                matrixDFS(board, row, col, root, found, new Set());
            }
        }
    }
    
    return Array.from(found);
}

function matrixDFS(
    board: string[][],
    row: number,
    col: number,
    node: TrieNode,
    found: Set<string>,
    visited: Set<string>
): void {
    // Base Case: out of bounds
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
        return;
    }

    const position = `${row},${col}`;
    const char = board[row][col];

    // Base Case: visited or no matching child in trie
    if (visited.has(position) || !node.children.has(char)) {
        return;
    }

    // Move to next node in trie
    const nextNode = node.children.get(char)!;

    // Found a word - add it but continue searching
    if (nextNode.isWord && nextNode.word) {
        found.add(nextNode.word);
        // Optional optimization: mark as not a word to avoid re-adding
        nextNode.isWord = false;
    }

    visited.add(position);

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1],  // right
        [1, 0],  // down
        [0, -1], // left
    ];

    for (const [rowDelta, colDelta] of directions) {
        matrixDFS(
            board,
            row + rowDelta,
            col + colDelta,
            nextNode, // Pass the advanced node, not the current one
            found,
            visited
        );
    }

    visited.delete(position);
}

class TrieNode {
    children: Map<string, TrieNode>;
    isWord: boolean;
    word?: string; // Store the actual word
    
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}