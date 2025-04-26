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

function postorderTraversal(root: TreeNode | null): number[] {

    // Edge Case: Empty Tree
    if(!root) {
        return [];
    }

    const results = [];

    function traverse(node) {

        // 1. Left
        if(node.left) {
            traverse(node.left);
        }

        // 2. Right
        if(node.right) {
            traverse(node.right);
        }

        // 3. Visit the node
        results.push(node.val);

    }

    traverse(root);

    return results;
    
};