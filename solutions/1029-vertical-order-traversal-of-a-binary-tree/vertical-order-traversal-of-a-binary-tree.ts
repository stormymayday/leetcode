/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function verticalTraversal(root: TreeNode | null): number[][] {
    const res: number[][] = [];

    if (root === null) {
        return res;
    }

    let queue: [TreeNode, number, number][] = [[root, 0, 0]]; // [node, row, col]

    // Maps column numbers to [row, value] pairs
    const colToRowVal = new Map<number, [number, number][]>();

    // Will help to iterate over the hashmap and fill up the result in O(n) time
    let minCol: number = 0;
    let maxCol: number = 0;

    // Phase 1: BFS
    while (queue.length > 0) {
        const nextQueue: [TreeNode, number, number][] = [];

        for (let i = 0; i < queue.length; i += 1) {
            const [currNode, currRow, currCol] = queue[i];

            minCol = Math.min(minCol, currCol);
            maxCol = Math.max(maxCol, currCol);

            if (!colToRowVal.has(currCol)) {
                colToRowVal.set(currCol, []);
            }
            colToRowVal.get(currCol).push([currRow, currNode.val]);

            if (currNode.left !== null) {
                nextQueue.push([currNode.left, currRow + 1, currCol - 1]);
            }

            if (currNode.right !== null) {
                nextQueue.push([currNode.right, currRow + 1, currCol + 1]);
            }
        }

        queue = nextQueue;
    }

    // Extra Step: Sorting by row / value
    for(const rowValuePairs of colToRowVal.values()) {
        rowValuePairs.sort((a, b) => {
             // Sort by row if different
            if(a[0] !== b[0]) {
                return a[0] - b[0];
            } 
            // Otherwise, sort by value (row is the same)
            else {
                return a[1] - b[1];
            }
        });
    }

    // Phase 2: fill up the result
    for (let col = minCol; col <= maxCol; col += 1) {
        const rowValuePairs = colToRowVal.get(col)!;
        const values: number[] = [];
        for(const [row,value] of rowValuePairs) {
            values.push(value);
        }
        res.push(values);
    }

    return res;
};