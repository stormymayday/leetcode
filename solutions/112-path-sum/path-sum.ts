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

    function dfs(root: TreeNode | null, sum: number):boolean {

        if(root === null) {
            return false;
        }

        if(root.left === null && root.right === null) {
            return root.val + sum === targetSum;
        }

        return dfs(root.left, sum + root.val) || dfs(root.right, sum + root.val);
    }

    return dfs(root, 0);
};