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

    let res: number = Infinity;
    let minDiff: number = Infinity;

    if(root === null) {
        return res;
    }

    let curr: TreeNode | null = root;

    while(curr !== null) {

        // Main Logic
        let diff = Math.abs(curr.val - target);
        if((diff < minDiff) || (diff === minDiff && curr.val < res)) {
            minDiff = diff;
            res = curr.val;
        }

        // if target is smaller than current value, going right will not make the difference smaller
        if(target < curr.val) {
            // therefore, go left to potentially get closer to target
            curr = curr.left;
        } 
        // similarly, if target is larger than current value, going left will not make the difference smaller
        else if(target > curr.val) {
            // therefore, go right
            curr = curr.right;
        }
        // exact match
        else {
            return curr.val;
        }

    }

    return res;

};