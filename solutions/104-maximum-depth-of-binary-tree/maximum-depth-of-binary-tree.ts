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

    const leftSubtreeMaxDepth = maxDepth(root.left);
    const rightSubtreeMaxDepth = maxDepth(root.right);

    return 1 + Math.max(leftSubtreeMaxDepth, rightSubtreeMaxDepth);

};