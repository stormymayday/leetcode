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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {

    if(root === null) {
        return false;
    }

    let queue: [TreeNode, number][] = [[root, root.val]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, currSum] = queue[i];

            if(currNode.left === null && currNode.right === null) {
                if(currSum === targetSum) {
                    return true;
                }
            }

            if(currNode.left !== null) {
                nextQueue.push([currNode.left, currSum + currNode.left.val]);
            }

            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currSum + currNode.right.val]);
            }

        }

        queue = nextQueue;

    }

    return false;
    
};