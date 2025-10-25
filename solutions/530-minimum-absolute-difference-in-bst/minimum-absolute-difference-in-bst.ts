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

    const inorder: number[] = [];

    function inorderDFS(node: TreeNode | null): void {
        if (node === null) {
            return;
        }
        inorderDFS(node.left);
        inorder.push(node.val);
        inorderDFS(node.right);
    }
    inorderDFS(root);

    for (let i = 0; i < inorder.length - 1; i += 1) {

        minDiff = Math.min(minDiff, inorder[i + 1] - inorder[i]);

    }

    return minDiff;
};