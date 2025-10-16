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

    if(root === null || (root.left === null && root.right === null)) {
        return true;
    }

    function helperDFS(node: TreeNode | null, leftBound: number, rightBound: number): boolean {

        if(node === null) {
            return true;
        }

        if(node.val <= leftBound || node.val >= rightBound) {
            return false;
        }

        const leftSubtree = helperDFS(node.left, leftBound, node.val);
        if(leftSubtree === false) {
            return false;
        }

        const rightSubtree = helperDFS(node.right, node.val, rightBound);
        if(rightSubtree === false) {
            return false;
        }

        return true;

    }

    return helperDFS(root, -Infinity, Infinity);
    
};