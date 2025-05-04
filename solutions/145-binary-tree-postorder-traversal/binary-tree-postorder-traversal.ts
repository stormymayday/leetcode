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

    function traverse(root) {

        // Base Case
        if(root === null) {
            return;
        }

        // 1. Recurse Left
        traverse(root.left);

        // 2. Recurse Right
        traverse(root.right);

        // 3. Visit Node
        result.push(root.val);

    }

    traverse(root);
    return result;
};