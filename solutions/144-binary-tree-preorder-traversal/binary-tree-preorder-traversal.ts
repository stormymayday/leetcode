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

function preorderTraversal(root: TreeNode | null): number[] {
    if(root === null) {
        return [];
    }
    const result = [];
    function dfs(root) {
        if(root === null) {
            return;
        }
        result.push(root.val);
        dfs(root.left);
        dfs(root.right);
    }
    dfs(root);
    return result;
};