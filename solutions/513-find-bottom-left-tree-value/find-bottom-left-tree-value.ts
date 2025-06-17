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
    const result = [];
    const queue = [root];
    while(queue.length > 0) {
        const queueLength = queue.length;
        const level = [];
        for(let i = 0; i < queueLength; i += 1) {
            const current = queue.shift();
            level.push(current.val);
            if(current.left) {
                queue.push(current.left);
            }
            if(current.right) {
                queue.push(current.right);
            }
        }
        result.push(level);
    }
    return result[result.length - 1][0];
};