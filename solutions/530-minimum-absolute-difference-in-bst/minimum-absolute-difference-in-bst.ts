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

function getMinimumDifference(root: TreeNode | null): number {
    let minDiff = Infinity;
    let prev: TreeNode | null = null;
    let curr: TreeNode | null = root;
    const stack: TreeNode[] = [];
    while(curr !== null || stack.length > 0){
        while(curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop()!;

        if(prev !== null) {
            minDiff = Math.min(minDiff, curr.val - prev.val);
        }

        prev = curr;
        curr = curr.right;
    }

    return minDiff;
};