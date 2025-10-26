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

    if(root === null) {
        return res;
    }

    // Phase 1: BFS
    let queue: [TreeNode, number, number][] = [[root, 0, 0]]; // [node, row, col]
    const colToRowVals = new Map<number, [number, number][]>();
    let minCol: number = 0;
    let maxCol: number = 0;
    while(queue.length > 0) {

        let nextQueue: [TreeNode, number, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, currRow, currCol] = queue[i];

            // Update min and max column boundaries
            minCol = Math.min(minCol, currCol);
            maxCol = Math.max(maxCol, currCol);

            // Create / update hash map entry for this column
            if(!colToRowVals.has(currCol)) {
                colToRowVals.set(currCol, []);
            }
            colToRowVals.get(currCol).push([currRow, currNode.val]);

            // Prepare nextQueue
            if(currNode.left !== null) {
                nextQueue.push([currNode.left, currRow + 1, currCol - 1]);
            }
            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currRow + 1, currCol + 1]);
            }

        }

        queue = nextQueue;

    }

    // Phase 2: sort the entries
    // - First by row
    // - If rows are the same, by value
    for(const rowValuePairs of colToRowVals.values()) {
        rowValuePairs.sort((a, b) => {
            // try sorting rows (index 0) first
            if(a[0] !== b[0]) {
                return a[0] - b[0];
            }
            // otherwise, sort by values (index 1)
            else {
                return a[1] - b[1];
            }
        });
    }

    // Phase 3: fill out the result
    for(let col = minCol; col <= maxCol; col += 1) {
        // [[row, value], [row, value], ...]
        const sortedRowValuePairs = colToRowVals.get(col);
        const values = sortedRowValuePairs.map(([row, value]) => value);
        res.push(values);
    }
    return res;
    
};