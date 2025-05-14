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

function isValidBST(root: TreeNode | null): boolean {
    let prev: number | null = null;
    
    function inorder(node: TreeNode | null): boolean {
        if (!node) return true;
        
        // Check left subtree
        if (!inorder(node.left)) return false;
        
        // Check current node - it should be greater than the previous value
        if (prev !== null && node.val <= prev) return false;
        prev = node.val;
        
        // Check right subtree
        return inorder(node.right);
    }
    
    return inorder(root);
}