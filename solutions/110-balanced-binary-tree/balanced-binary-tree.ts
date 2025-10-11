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

function isBalanced(root: TreeNode | null): boolean {

    function helper(root: TreeNode | null): [boolean, number] {
        if(root === null) {
            return [true, -1];
        }

        const leftSubtree = helper(root.left);
        const rightSubtree = helper(root.right);

        if(leftSubtree[0] === true && rightSubtree[0] === true && Math.abs(leftSubtree[1] - rightSubtree[1]) <= 1) {
            return [true, Math.max(leftSubtree[1], rightSubtree[1]) + 1];
        } else {
            return [false, Math.max(leftSubtree[1], rightSubtree[1]) + 1];
        }
    }

    return helper(root)[0];
    
};