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

function widthOfBinaryTree(root: TreeNode | null): number {

    let maxWidth: number = 0;

    if (root === null) {
        return maxWidth;
    }

    let queue: [TreeNode, number][] = [[root, 0]]; // [node, nodeNumber]
    while (queue.length > 0) {

        const nextQueue: [TreeNode, number][] = [];

        const levelStart = queue[0][1];
        const levelEnd = queue[queue.length - 1][1];
        maxWidth = Math.max(maxWidth, levelEnd - levelStart + 1);

        for (let i = 0; i < queue.length; i += 1) {

            const [currNode, currNodeNum] = queue[i];

            // Important! Must normalize position relative to levelStart to prevent overflow
            const normalizedPos = currNodeNum - levelStart;

            if (currNode.left !== null) {
                nextQueue.push([currNode.left, normalizedPos * 2]);
            }
            
            if (currNode.right !== null) {
                nextQueue.push([currNode.right, normalizedPos * 2 + 1]);
            }

        }

        queue = nextQueue;

    }

    return maxWidth;

};