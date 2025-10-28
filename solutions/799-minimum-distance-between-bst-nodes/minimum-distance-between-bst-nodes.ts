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

function minDiffInBST(root: TreeNode | null): number {
    
    let minDiff: number = Infinity;

    if(root === null) {
        return minDiff;
    }

    let curr: TreeNode | null = root;
    let prev: TreeNode | null = null;
    while(curr !== null) {
        if(curr.left === null) {

            if(prev !== null) {
                minDiff = Math.min(minDiff, curr.val - prev.val);
            }

            prev = curr;
            curr = curr.right;

        } else {
            let predecessor = curr.left;
            while(predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }
            if(predecessor.right === null) {
                predecessor.right = curr;
                curr = curr.left;
            } else {
                predecessor.right = null;

                if(prev !== null) {
                    minDiff = Math.min(minDiff, curr.val - prev.val);
                }

                prev = curr;
                curr = curr.right;
            }
        }
    }
    return minDiff;

};