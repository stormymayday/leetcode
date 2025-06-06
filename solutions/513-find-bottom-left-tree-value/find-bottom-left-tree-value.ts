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

function findBottomLeftValue(root: TreeNode | null): number {

    if(root === null) {
        return null;
    }

    const result = [];
    const queue = [root];
    while(queue.length > 0) {
        const current = queue.shift();
        result.push(current.val);
        if(current.right) {
            queue.push(current.right);
        }
        if(current.left) {
            queue.push(current.left);
        }
    }
    return result[result.length - 1];
};