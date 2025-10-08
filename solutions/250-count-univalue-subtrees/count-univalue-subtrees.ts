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

    function dfs(root: TreeNode | null): [boolean, number] {

        if(root === null) {
            return [true, 0];
        }

        if(root.left === null && root.right === null) {
            return [true, 1];
        }

        const left = dfs(root.left);
        const right = dfs(root.right);
        const count = left[1] + right[1];

        if(left[0] === true && right[0] === true) {

            if(root.left !== null && root.val !== root.left.val) {
                return [false, count];
            }

            if(root.right !== null && root.val !== root.right.val) {
                return [false, count];
            }

            return [true, count + 1];

        } else {
            return [false, count];
        }
    }

    return dfs(root)[1];

};
