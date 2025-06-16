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

function preorderTraversal(root: TreeNode | null): number[] {
    const result = [];
    return traverse(root, result);
};

function traverse(root: TreeNode | null, arr: number[]): number[] {
    if(root === null) {
        return arr;
    }
    arr.push(root.val);
    traverse(root.left, arr);
    traverse(root.right, arr);
    return arr;
}