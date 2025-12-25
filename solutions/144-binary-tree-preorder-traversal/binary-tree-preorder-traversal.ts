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

function preorderTraversal(root: TreeNode | null): number[] {

    const res: number[] = [];

    function helper(node: TreeNode | null): void {
        if(node === null) {
            return;
        }

        res.push(node.val);
        helper(node.left);
        helper(node.right);
    }

    helper(root);
    
    return res;
    
};