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

function averageOfLevels(root: TreeNode | null): number[] {
    const result = [];
    const queue = [root];
    while(queue.length > 0) {
        let sum = 0;
        const n = queue.length;
        for(let i = 0; i < n; i += 1) {
            const current = queue.shift();
            sum += current.val;
            if(current.left) {
                queue.push(current.left);
            }
            if(current.right) {
                queue.push(current.right);
            }
        }
        result.push(sum/n);
    }
    return result;
};