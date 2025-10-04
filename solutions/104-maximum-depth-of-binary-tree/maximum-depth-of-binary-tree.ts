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
    let maxDepth = 0;

    function topDownDFS(root: TreeNode | null, depth: number): void {
        // Base Case: null node
        if (root === null) {
            return;
        }

        // Visit: check if leaf node
        if(root.left === null && root.right === null) {
            maxDepth = Math.max(maxDepth, depth);
        }

        // Recurse Left
        topDownDFS(root.left, depth + 1);

        // Recurse Right
        topDownDFS(root.right, depth + 1);
    }

    topDownDFS(root, 1);

    return maxDepth;
};