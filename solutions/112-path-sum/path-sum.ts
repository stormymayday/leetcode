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

    let remainder = targetSum - root.val;

    return hasPathSum(root.left, remainder) || hasPathSum(root.right, remainder);


};