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

    if(!root) {
        return 0;
    }

    let sum = 0;
    const stack = [root];
    while(stack.length > 0) {
        const current = stack.pop();
        if(current.val >= low && current.val <= high) {
            sum+=current.val;
        }
        if(current.right) {
            stack.push(current.right);
        }
        if(current.left) {
            stack.push(current.left);
        }
    }
    return sum;
};