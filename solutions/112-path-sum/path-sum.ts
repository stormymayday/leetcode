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

    if(!root.left && !root.right) {
        return root.val === targetSum;
    }

    const left = hasPathSum(root.left, targetSum - root.val);
    const right = hasPathSum(root.right, targetSum - root.val);

    return left || right;
};