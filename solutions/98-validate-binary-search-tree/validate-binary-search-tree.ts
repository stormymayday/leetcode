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
    function dfs(root: TreeNode | null, left: number, right:number):boolean {
        if(root === null) {
            return true;
        }

        if(left >= root.val || root.val >= right) {
            return false;
        }

        return dfs(root.left, left, root.val) && dfs(root.right, root.val, right);
    }
    return dfs(root, -Infinity, Infinity);
};