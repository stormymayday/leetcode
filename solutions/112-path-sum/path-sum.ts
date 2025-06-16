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

function hasPathSum(root: TreeNode | null, targetSum: number, currSum: number = 0): boolean {
    if(root === null) {
        return false;
    }

    currSum += root.val;

    if(!root.left && !root.right) {
        return currSum === targetSum;
    }

    return hasPathSum(root.left, targetSum, currSum) || hasPathSum(root.right, targetSum, currSum);
};