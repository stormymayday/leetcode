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
            
            // left child is not null but value is different from the root
            if(root.left !== null && root.val !== root.left.val) {
                return false;
            }

            // right child is not null but value is different from the root
            if(root.right !== null && root.val !== root.right.val) {
                return false;
            }

            // Otherwise, either both children are not null or only one BUT values must be the same
            count += 1;
            return true;

        } else {
            return false;
        }
    }

    dfs(root);

    return count;

};