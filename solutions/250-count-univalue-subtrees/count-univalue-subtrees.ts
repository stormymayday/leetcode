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

function countUnivalSubtrees(root: TreeNode | null): number {

    if(root === null) {
        return 0;
    }

    function helperDFS(root: TreeNode | null): [boolean, number] {

        if(root === null) {
            return [true, 0];
        }

        if(root.left === null && root.right === null) {
            return [true, 1];
        }

        const leftSubtree = helperDFS(root.left);
        const rightSubtree = helperDFS(root.right);
        const count = leftSubtree[1] + rightSubtree[1];

        if(leftSubtree[0] === true && rightSubtree[0] === true) {

            if(root.left !== null && root.left.val !== root.val) {
                return [false, count];
            }

            if(root.right !== null && root.right.val !== root.val) {
                return [false, count];
            }

            return [true, count + 1];

        } else {
            return [false, count];
        }

    }

    return helperDFS(root)[1];
    
};