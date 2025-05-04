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

function invertTree(root: TreeNode | null): TreeNode | null {
    // Base Case
    if(root === null) {
        return null;
    }

    // Swap children
    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    // Traverse Left
    invertTree(root.left);

    // Traverse Right
    invertTree(root.right);

    return root;
};