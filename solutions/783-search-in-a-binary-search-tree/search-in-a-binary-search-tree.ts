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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {

    if(!root) {
        return root;
    }

    const queue = [root];
    while(queue.length > 0) {
        const current = queue.shift();
        if(current.val === val) {
            return current;
        }
        if(current.left) {
            queue.push(current.left);
        }
        if(current.right) {
            queue.push(current.right);
        }
    }
    return null;
};