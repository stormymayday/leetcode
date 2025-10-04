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

function maxDepth(root: TreeNode | null): number {
    return dfs(root);
};

function dfs(root: TreeNode | null): number {
    // Base Case: null node
    if(root === null) {
        return 0;
    }

    // Base Case 2: leaf node
    // if(root.left === null && root.right === null) {
    //     return 1;
    // }

    return 1 + Math.max(dfs(root.left), dfs(root.right));
}