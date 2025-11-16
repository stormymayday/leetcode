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

function closestValue(root: TreeNode | null, target: number): number {

    let closestVal: number = root.val;

    let curr: TreeNode | null = root;

    while (curr !== null) {

        // exact match
        if (target === curr.val) {
            return curr.val;
        }

        // Update Closest
        if (
            // if absolute difference between 'target' and 'curr.val' is less than the
            // absolute difference between 'target' and 'closestVal'
            (Math.abs(target - curr.val) < Math.abs(target - closestVal)) ||
            // OR if the absolute difference is equal BUT 'curr.val' is smaller than 'closestVal'
            ((Math.abs(target - curr.val) === Math.abs(target - closestVal)) && curr.val < closestVal)
        ) {
            // update closestVal
            closestVal = curr.val;
        }

        // target is greater than curr.val
        if (curr.right !== null && target > curr.val) {
            curr = curr.right;
        } 
        // target is less than curr.val
        else if(curr.left !== null && target < curr.val) {
            curr = curr.left;
        } else {
            break;
        }
    }

    return closestVal;
};