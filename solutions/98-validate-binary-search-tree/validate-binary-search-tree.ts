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

function isValidBST(root: TreeNode | null): boolean {

    if(root === null || (root.left === null && root.right === null)) {
        return true;
    }

    let queue: [TreeNode, number, number][] = [[root, -Infinity, Infinity]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, number, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, leftBound, rightBound] = queue[i];

            if(currNode.val <= leftBound || currNode.val >= rightBound) {
                return false;
            }

            if(currNode.left !== null) {
                nextQueue.push([currNode.left, leftBound, currNode.val]);
            }

            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currNode.val, rightBound]);
            }

        }

        queue = nextQueue;

    }

    return true;
    
};