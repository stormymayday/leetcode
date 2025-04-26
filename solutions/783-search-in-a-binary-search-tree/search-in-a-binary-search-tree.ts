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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    // Base Case 1: No node exists
    if (root === null) {
        return null;
    }

    // Base Case 2: value equals current node's value
    if (val === root.val) {
        return root;
    }

    // Recursive Cases:
    // 1. Value is less than current node's value
    if (val < root.val) {
        return searchBST(root.left, val);
    }
    // 2. Value is greater than current node's value
    else {
        return searchBST(root.right, val);
    }
}