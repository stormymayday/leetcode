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

function maxDepth(root: TreeNode | null): number {

    if(root === null) {
        return 0;
    }

    let queue: TreeNode[] = [root];
    let maxDepth = 1;

    while(queue.length > 0) {

        const nextQueue: TreeNode[] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            if(currNode.left !== null) {
                nextQueue.push(currNode.left);
            }

            if(currNode.right !== null) {
                nextQueue.push(currNode.right);
            }

        }

        if(nextQueue.length > 0) {
            maxDepth += 1;
        }

        queue = nextQueue;

    }

    return maxDepth;
    
};