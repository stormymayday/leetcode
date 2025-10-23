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

function goodNodes(root: TreeNode | null): number {

    let count = 0;

    if (root === null) {
        return count;
    }

    let queue: [TreeNode, number][] = [[root, root.val]];
    while (queue.length > 0) {

        const nextQueue: [TreeNode, number][] = [];

        for (let i = 0; i < queue.length; i += 1) {

            let [currNode, currMax] = queue[i];

            if(currNode.val >= currMax) {
                count += 1;
                currMax = currNode.val;
            }

            if(currNode.left !== null) {
                nextQueue.push([currNode.left, currMax]);
            }

            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currMax]);
            }
            
        }

        queue = nextQueue;

    }

    return count;

};