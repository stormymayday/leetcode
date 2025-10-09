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
    
    
    function dfs(root: TreeNode | null, leftBound: number, rightBound: number): boolean {

        if(root === null) {
            return true;
        }

        if(root.val <= leftBound || root.val >= rightBound) {
            return false;
        }

        const leftSubtree = dfs(root.left, leftBound, root.val);
        const rightSubtree = dfs(root.right, root.val, rightBound);

        return leftSubtree && rightSubtree;

    }

    return dfs(root, -Infinity, Infinity);

};