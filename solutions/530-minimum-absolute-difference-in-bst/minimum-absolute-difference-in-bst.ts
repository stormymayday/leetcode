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

function getMinimumDifference(root: TreeNode | null): number {
    let minDiff = Infinity;
    let prev: TreeNode | null = null;
    function inorderDFS(node: TreeNode | null): void {
        if (node === null) {
            return;
        }
        inorderDFS(node.left);

        if (prev !== null) {
            minDiff = Math.min(minDiff, node.val - prev.val);
        }
        prev = node;
        inorderDFS(node.right);
    }
    inorderDFS(root);

    return minDiff;
};