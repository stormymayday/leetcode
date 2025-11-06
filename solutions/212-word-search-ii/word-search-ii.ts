function findWords(board: string[][], words: string[]): string[] {

    const res: string[] = [];

    const trie = new Trie();
    for(let i = 0; i < words.length; i += 1) {
        trie.insert(words[i]);
    }

    for (let row = 0; row < board.length; row += 1) {
        for (let col = 0; col < board[0].length; col += 1) {
            if(trie.startsWith(board[row][col])) {
                dfs(board, row, col,  trie, [], res, new Set<string>());
            }
        }
    }

    return res;

};

function dfs(board: string[][], row: number, col: number, trie: Trie, path: string[], res: string[], visited: Set<string>): void {

    // Base Case: out of bounds
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
        return;
    }

    // Base Case: visited
    const position = `${row},${col}`;
    if (visited.has(position)) {
        return;
    }

    visited.add(position);
    path.push(board[row][col]);
    const prefix = path.join("");

    // Base Case: character missmatch
    if (trie.startsWith(prefix) === false) {
        // backtrck
        visited.delete(position);
        path.pop();
        return;
    }

    // Found a word
    if (trie.search(prefix) === true) {
        res.push(prefix);
        trie.delete(prefix);
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
        dfs(board, neighborRow, neighborCol, trie, path, res, visited);
    }

    // Explored all directions for current positon, backtrack
    visited.delete(position);
    path.pop();
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
        for(let i = 0; i < word.length; i += 1) {
            if(!curr.children.has(word[i])) {
                curr.children.set(word[i], new TrieNode());
            }
            curr = curr.children.get(word[i]);
        }
        curr.isWord = true;
    }
    search(word: string): boolean {
        let curr: TrieNode = this.root;
        for(let i = 0; i < word.length; i += 1) {
            if(!curr.children.has(word[i])) {
                return false;
            } else {
                curr = curr.children.get(word[i]);
            }
        }
        return curr.isWord;
    }
    startsWith(prefix: string): boolean {
        let curr: TrieNode = this.root;
        for(let i = 0; i < prefix.length; i += 1) {
            if(!curr.children.has(prefix[i])) {
                return false;
            } else {
                curr = curr.children.get(prefix[i]);
            }
        }
        return true;
    }
    delete(word: string): void {
        // returns a boolean
        // If 'true' indicates that parent node can remove the target child entry from it's hash map
        // Otherwise, 'false' can indicate that the word was not found or last charater (of the target) still has entries in it's hash map
        // Therefore, it cannot be removed yet
        function helper(idx: number, node: TrieNode): boolean {
            // Base Case: reached the last node
            if(idx === word.length) {
                if(node.isWord === false) {
                    return false; // word was not found
                } else {
                    // Otherwise, mark this as no longer being end of a word
                    // (This essentially deletes the word)
                    node.isWord = false;
                    // This will send signal to a parent node whether if this child entry should be removed from it's hash map
                    return node.children.size === 0;
                }
            }
            
            if(!node.children.has(word[idx])) {
                // word does not exist
                return false;
            } 
            // otherwise, word can exist
            else {
                // check if current node can delete the child entry from it's hash map
                const shouldDeleteChild = helper(idx + 1, node.children.get(word[idx]));

                if(shouldDeleteChild === true) {
                    node.children.delete(word[idx]);
                    // if current's children becomes empty we can delete it as well
                    return node.children.size === 0;
                } else {
                    // 'shouldDeleteChild' was false
                    // return 'false' explicitly for consistency
                    // otherwise, it returns 'undefined' which is 'falsy'
                    return false;
                }
            }

        }
        helper(0, this.root);
    }
}