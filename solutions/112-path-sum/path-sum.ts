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
    return dfs(root, 0, targetSum);
};

function dfs(root: TreeNode | null, sum: number, targetSum: number): boolean {

    // Base Case: null node
    if(root === null) {
        return false;
    }

    // Base Case: leaf node
    if(root.left === null && root.right === null) {
        return root.val + sum === targetSum;
    }

    // Recurse Left
    const left = dfs(root.left, root.val + sum, targetSum);

    // Recurse Right
    const right = dfs(root.right, root.val + sum, targetSum);

    return left || right;
}