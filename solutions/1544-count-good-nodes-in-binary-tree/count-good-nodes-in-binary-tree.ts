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

function goodNodes(root: TreeNode | null): number {

    // Global = bad! Will need to refactor
    let count = 0;

    if(root === null) {
        return count;
    }

    // Top Down Recrsion
    function helper(node: TreeNode | null, max: number): number {
        if(node === null) {
            return 0;
        }

        if(node.val >= max) {
            count += 1;
            helper(node.left, node.val);
            helper(node.right, node.val);
        } else {
            helper(node.right, max);
            helper(node.left, max);
        }

    }

    helper(root, root.val);

    return count;

};