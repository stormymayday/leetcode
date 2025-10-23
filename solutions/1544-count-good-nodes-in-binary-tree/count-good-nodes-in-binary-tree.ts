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

    // Top Down Recrsion
    function helper(node: TreeNode | null, max: number): number {
        if(node === null) {
            return 0;
        }

        let count = 0;
        if(node.val >= max) {
            count += 1;
            count += helper(node.left, node.val);
            count += helper(node.right, node.val);
        } else {
            count += helper(node.right, max);
            count += helper(node.left, max);
        }
        return count;

    }

    return helper(root, root.val);

};