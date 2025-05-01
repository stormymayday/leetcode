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

    const result = [];

    function traverse(node) {

        // 1. Visit Node
        result.push(node.val);

        // 2. Recurse Left
        if(node.left) {
            traverse(node.left);
        }

        // 3. Recurse Right
        if(node.right) {
            traverse(node.right);
        }

    }

    traverse(root);

    return result;

};