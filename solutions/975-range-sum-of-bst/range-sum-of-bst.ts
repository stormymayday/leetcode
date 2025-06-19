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

function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
    let sum = 0;
    if(root === null) {
        return sum;
    }
    const queue = [root];
    while(queue.length > 0) {
        const current = queue.shift();
        if(current.val >= low && current.val <= high) {
            sum += current.val;
        }
        if(current.left !== null && current.val >= low) {
            queue.push(current.left);
        }
        if(current.right !== null && current.val <= high) {
            queue.push(current.right);
        }

    }
    return sum;
};