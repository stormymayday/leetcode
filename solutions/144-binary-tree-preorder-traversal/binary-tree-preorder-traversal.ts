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

    // Edge Case: Empty Tree
    if(!root) {
        return [];
    }

    const result = [];

    function traverse(node) {

        // 1. Process the node
        result.push(node.val);

        // 2. Left
        if(node.left) {
            traverse(node.left);
        }

        // 3. Right
        if(node.right) {
            traverse(node.right);
        }

    }

    // start with the root
    traverse(root);

    return result;
    
};