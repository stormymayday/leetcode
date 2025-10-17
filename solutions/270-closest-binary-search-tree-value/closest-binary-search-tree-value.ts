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

    if (root === null) {
        return -Infinity;
    }

    let curr: TreeNode | null = root;
    let candidate: number = curr.val;
    let remainder: number = Infinity;

    while (curr !== null) {

        if (Math.abs(curr.val - target) < remainder || (Math.abs(curr.val - target) === remainder && candidate > curr.val)) {
            remainder = Math.abs(curr.val - target);
            candidate = curr.val;
        }

        if (target < curr.val) {
            curr = curr.left;
        } else if (target > curr.val) {
            curr = curr.right;
        } else {
            // exact match
            candidate = curr.val;
            break;
        }

    }

    return candidate;

};