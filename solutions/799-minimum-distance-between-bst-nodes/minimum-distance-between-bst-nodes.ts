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

    let minDiff = Infinity;
    const inorder: number[] = [];
    let curr: TreeNode = root;
    const stack: TreeNode[] = [];
    while(curr !== null || stack.length > 0) {
        while(curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        // if(curr !== null) {
            inorder.push(curr.val);
        // }
        curr = curr.right;
    }
    for (let i = 0; i < inorder.length - 1; i += 1) {
        // Redundant check
        // if (i + 1 <= inorder.length - 1) {
            minDiff = Math.min(minDiff, Math.abs(inorder[i] - inorder[i + 1]));
        // }
    }
    return minDiff;

};