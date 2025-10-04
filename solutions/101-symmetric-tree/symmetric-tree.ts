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

function isSymmetric(root: TreeNode | null): boolean {

    // Edge Case: null node
    if (root === null) {
        return true;
    }

    return dfs(root.left, root.right);

};

function dfs(left: TreeNode | null, right: TreeNode | null): boolean {
    // Base Case 1: Both are null
    if (left === null && right === null) {
        return true; // considered symmetric
    }

    // Base Case 2: Only one is null
    if (left === null || right === null) {
        return false;
    }

    // Visit: Both are not null
    const current = left.val === right.val;

    // Recurse Outer
    const outer = dfs(left.left, right.right);

    // Recurse Inner
    const inner = dfs(left.right, right.left);

    return current && outer && inner;

}