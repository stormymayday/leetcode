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

function minDiffInBST(root: TreeNode | null): number {

    let minDiff: number = Infinity;

    if(root === null) {
        return minDiff;
    }

    const inorder: number[] = [];
    function inorderDFS(root: TreeNode | null): void {
        if(root === null) {
            return;
        }
        inorderDFS(root.left);
        inorder.push(root.val);
        inorderDFS(root.right);
    }
    inorderDFS(root);

    for(let i = 0; i < inorder.length - 1; i += 1) {
        minDiff = Math.min(minDiff, inorder[i + 1] - inorder[i]);
    }

    return minDiff;

};