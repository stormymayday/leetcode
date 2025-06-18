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

function postorderTraversal(root: TreeNode | null): number[] {
    const result = [];
    if(root === null) {
        return result;
    }
    function dfs(root: TreeNode | null): void {
        if(root === null) {
            return;
        }
        dfs(root.left);
        dfs(root.right);
        result.push(root.val);
    }
    dfs(root);
    return result;
};