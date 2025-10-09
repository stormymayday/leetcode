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

function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
    
    // 1. Perform inorder traversal
    const inorderTraversal: TreeNode[] = [];
    function inorderDFS(root: TreeNode | null): void {
        if(root === null) {
            return;
        }
        inorderDFS(root.left);
        inorderTraversal.push(root);
        inorderDFS(root.right);
    }
    inorderDFS(root);

    // Linear Scan to find the successor
    for(let i = 0; i < inorderTraversal.length; i += 1) {
        if(p === inorderTraversal[i] && i + 1 < inorderTraversal.length) {
            return inorderTraversal[i + 1];
        }
    }

    return null;

};