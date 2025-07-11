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

function rightSideView(root: TreeNode | null): number[] {
    const result = [];
    function dfs(root, level) {
        if(root === null) {
            return;
        }

        if(result.length === level) {
            result.push(root.val);
        }

        dfs(root.right, level + 1);
        dfs(root.left, level + 1);
    }
    dfs(root, 0);
    return result;
};