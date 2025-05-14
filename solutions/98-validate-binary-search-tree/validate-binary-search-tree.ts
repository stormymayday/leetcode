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

    function helper(node, leftBound, rightBound) {
        // Base Case 1: null node
        if(node === null) {
            return true;
        }

        // Base Case 2: out of bounds
        if(node.val <= leftBound || node.val >= rightBound) {
            return false;
        }

        // Recurse Left & Right
        return helper(node.left, leftBound, node.val) && helper(node.right, node.val, rightBound);
    }

    return helper(root, -Infinity, Infinity);
    
};