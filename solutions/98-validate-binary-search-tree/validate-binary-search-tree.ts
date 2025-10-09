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

    function inorderDFS(root: TreeNode | null): boolean {

        if(root === null) {
            return true;
        }

        // Recurse Left
        if(inorderDFS(root.left) === false) {
            return false;
        }

        // Visit Current
        if(prev !== null && root.val <= prev) {
            return false;
        }
        prev = root.val;

        // Recurse Right
        return inorderDFS(root.right);

    }

    return inorderDFS(root);
    
};