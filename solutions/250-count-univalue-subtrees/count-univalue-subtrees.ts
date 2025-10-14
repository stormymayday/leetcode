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

    let count = 0;

    function helperDFS(root: TreeNode | null): boolean {

        if(root === null) {
            return true;
        }

        if(root.left === null && root.right === null) {
            count += 1;
            return true;
        }

        const leftSubtree = helperDFS(root.left);
        const rightSubtree = helperDFS(root.right);

        if(leftSubtree === true && rightSubtree === true) {

            if(root.left !== null && root.left.val !== root.val) {
                return false;
            }

            if(root.right !== null && root.right.val !== root.val) {
                return false;
            }

            count += 1;
            return true;

        } else {
            return false;
        }

    }

    helperDFS(root);

    return count;
    
};