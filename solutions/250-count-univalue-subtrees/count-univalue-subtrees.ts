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

        // Base Case: null root
        if (root === null) {
            return [true, 0];
        }

        // Base Case: leaf node
        if (root.left === null && root.right === null) {
            // every leaf is a uni-value subtree
            return [true, 1];
        }

        const left: [boolean, number] = dfs(root.left);
        const right: [boolean, number] = dfs(root.right);
        let count = left[1] + right[1];

        // both subtrees return true
        if (left[0] === true && right[0] === true) {
            
            // left child is not null but value is different from the root
            if(root.left !== null && root.val !== root.left.val) {
                return [false, count];
            }

            // right child is not null but value is different from the root
            if(root.right !== null && root.val !== root.right.val) {
                return [false, count];
            }

            // Otherwise, either both children are not null or only one BUT values must be the same
            return [true, count + 1];

        } else {
            return [false, count];
        }
    }

    return dfs(root)[1];


};