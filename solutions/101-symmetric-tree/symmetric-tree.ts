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

function isSymmetric(root: TreeNode | null): boolean {
    
    if(root === null) {
        return true;
    }

    function dfs(left: TreeNode | null, right: TreeNode | null): boolean {
        // Both are null
        if(left === null && right === null) {
            return true;
        }

        // Only one is null
        if((left !== null && right === null) || (left === null && right !== null)) {
            return false;
        }
        
        // Means both are not null, check values
        if(left.val !== right.val) {
            return false;
        }


        const outer = dfs(left.left, right.right);
        const inner = dfs(left.right, right.left);

        return outer && inner;

    }

    return dfs(root.left, root.right);

};