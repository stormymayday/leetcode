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

    if(!root) {
        return [];
    }

    let results = [];

    function traverse(node) {

        // 1. Push the current value
        results.push(node.val);

        // 2. Recurse left
        if(node.left) {
            traverse(node.left);
        }

        // 3. Recurse right
        if(node.right) {
            traverse(node.right);
        }

    }

    // Kick of the recursion with root
    traverse(root);

    return results;
    
};