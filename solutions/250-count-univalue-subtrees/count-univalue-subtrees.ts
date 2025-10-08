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

        // Base Case: null root
        if (root === null) {
            return true;
        }

        // Base Case: leaf node
        if (root.left === null && root.right === null) {
            // every leaf is a uni-value subtree
            count += 1;
            return true;
        }

        const left: boolean = dfs(root.left);
        const right: boolean = dfs(root.right);

        // both subtrees return true
        if (left === true && right === true) {

            // both children are not null
            if (root.left !== null && root.right !== null) {
                if (root.val === root.left.val && root.val === root.right.val) {
                    count += 1;
                    return true;
                } else {
                    return false;
                }
            }

            // left is not null
            if (root.left !== null && root.right === null) {
                if (root.val === root.left.val) {
                    count += 1;
                    return true;
                } else {
                    return false;
                }

            }

            // right is not null
            if (root.left === null && root.right !== null) {
                if (root.val === root.right.val) {
                    count += 1;
                    return true;
                } else {
                    return false;
                }
            }

            // both are null
            // return true;

        } else {
            return false;
        }
    }

    dfs(root);

    return count;

};