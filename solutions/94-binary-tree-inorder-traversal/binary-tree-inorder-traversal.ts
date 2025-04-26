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

function inorderTraversal(root: TreeNode | null): number[] {

    // Edge Case: Empty Tree
    if(!root) {
        return [];
    }

    const result = [];

    function traverse(node) {
        // 1. Left
        if(node.left) {
            traverse(node.left);
        }

        // 2. Visit Node
        result.push(node.val);

        // 3. Right
        if(node.right) {
            traverse(node.right);
        }
    }

    traverse(root);

    return result;
    
};