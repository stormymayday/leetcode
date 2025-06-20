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

function isBalanced(root: TreeNode | null): boolean {
    if(root === null) {
        return true;
    }

    const leftSubtreeHeight = height(root.left);
    const rightSubtreeHeight = height(root.right);

    if(Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) {
        return false;
    }

    return isBalanced(root.left) && isBalanced(root.right);
};

function height(root: TreeNode | null): number {
    if(root === null) {
        return 0;
    }

    return 1 + Math.max(height(root.left), height(root.right));
}