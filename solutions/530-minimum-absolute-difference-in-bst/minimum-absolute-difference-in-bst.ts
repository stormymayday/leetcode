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

    let prev = null;
    let minDiff = Infinity;

    function inOrder(root) {
        // Base Case
        if(root === null) {
            return;
        }

        // 1. Traverse Left
        inOrder(root.left);

        // 2. Visit Node
        if(prev !== null) {
            minDiff = Math.min(minDiff, Math.abs(root.val - prev));
        }
        prev = root.val;

        // 3. Traverse Right
        inOrder(root.right);

    }
    
    inOrder(root);
    return minDiff;

};