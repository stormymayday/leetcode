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

function verticalOrder(root: TreeNode | null): number[][] {

    const res: number[][] = [];

    if(root === null) {
        return res;
    }

    let queue: [TreeNode, number][] = [[root, 0]]; // [node, column]
    const columnVals = new Map<number, number[]>();
    let minCol: number = 0;
    let maxCol: number = 0;
    while(queue.length > 0) {

        const nextQueue: [TreeNode, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, currCol] = queue[i];

            if(!columnVals.has(currCol)) {
                columnVals.set(currCol, []);
            }
            columnVals.get(currCol).push(currNode.val);

            minCol = Math.min(minCol, currCol);
            maxCol = Math.max(maxCol, currCol);

            if(currNode.left !== null) {
                nextQueue.push([currNode.left, currCol - 1]);
            }

            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currCol + 1]);
            }

        }

        queue = nextQueue;

    }

    for(let col = minCol; col <= maxCol; col += 1) {
        res.push(columnVals.get(col));
    }
    return res;
    
};