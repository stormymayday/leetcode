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
    const result = [];
    if(root === null) {
        return result;
    }
    function helper(root: TreeNode | null): void {
        if(root === null) {
            return;
        }
        result.push(root.val);
        helper(root.left);
        helper(root.right);
    }
    helper(root);
    return result;
};