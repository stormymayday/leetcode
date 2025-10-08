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

    let count = 0;

    function dfs(root: TreeNode | null): boolean {

        if(root === null) {
            return true;
        }

        if(root.left === null && root.right === null) {
            count += 1;
            return true;
        }

        const left = dfs(root.left);
        const right = dfs(root.right);

        if(left === true && right === true) {

            if(root.left !== null && root.val !== root.left.val) {
                return false;
            }

            if(root.right !== null && root.val !== root.right.val) {
                return false;
            }

            count += 1;
            return true;

        } else {
            return false;
        }
    }

    dfs(root);

    return count;

};
