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

function levelOrder(root: TreeNode | null): number[][] {

    const res: number[][] = [];

    if(root === null) {
        return res;
    }

    let queue: TreeNode[] = [root];

    while(queue.length > 0) {

        const nextQueue: TreeNode[] = [];
        const currLevelVals: number[] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i]

            currLevelVals.push(currNode.val);

            if(currNode.left !== null) {
                nextQueue.push(currNode.left);
            }

            if(currNode.right !== null) {
                nextQueue.push(currNode.right);
            }

        }

        res.push(currLevelVals);
        queue = nextQueue;

    }

    return res;
    
};