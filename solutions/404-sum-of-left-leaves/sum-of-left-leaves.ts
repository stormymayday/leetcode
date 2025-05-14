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

function sumOfLeftLeaves(root: TreeNode | null): number {

    if(!root) {
        return 0;
    }
    let sum = 0;
    const queue = [root];
    while(queue.length > 0) {
        const current = queue.shift();

        if(current.left) {
            if(!current.left.left && !current.left.right) {
                sum += current.left.val;
            }
            queue.push(current.left);
        }

        if(current.right) {
            queue.push(current.right);
        }
    }
    return sum;
};