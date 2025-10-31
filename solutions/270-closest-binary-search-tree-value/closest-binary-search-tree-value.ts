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

function closestValue(root: TreeNode | null, target: number): number {

    let res: number = Infinity;
    let minDiff: number = Infinity;

    function dfs(node: TreeNode | null): void {

        if (node === null) {
            return null;
        }

        const absDiff = Math.abs(node.val - target);
        if ((absDiff < minDiff) || (minDiff === absDiff && node.val < res)) {
            minDiff = absDiff;
            res = node.val;
        }
        dfs(node.left);
        dfs(node.right);

    }
    dfs(root);

    return res;

};