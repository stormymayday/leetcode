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
    return bottomUpDFS(root);
};

function bottomUpDFS(root: TreeNode | null): number {
    // Base Case: null node
    if(root === null) {
        return 0;
    }
    
    // Recurse Left
    const left = bottomUpDFS(root.left);

    // Recurse Right
    const right = bottomUpDFS(root.right);

    // Visit
    return 1 + Math.max(left, right)
}