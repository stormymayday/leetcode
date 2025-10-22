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

function diameterOfBinaryTree(root: TreeNode | null): number {

    let longestPath = 0;

    if(root === null) {
        return longestPath;
    }

    // This helper returns height of a node
    // the longest path / diameter is calculated in-between
    function helper(node: TreeNode | null): number {
        // Base Case: if node is null, the height is zero
        if(node === null) {
            return 0;
        }

        const leftSubtreeHeight = helper(node.left);
        const rightSubtreeHeight = helper(node.right);

        // Calculating longest path through this node and updating the max
        // Forumla: longest path = left subtree height + right subtree height
        longestPath = Math.max(longestPath, leftSubtreeHeight + rightSubtreeHeight);

        // Returning height at current node
        // One plus max of left or right
        return 1 + Math.max(leftSubtreeHeight, rightSubtreeHeight);
    }

    helper(root);

    return longestPath;
};