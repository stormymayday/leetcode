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
    
    let minDiff = Infinity;
    let prev: TreeNode | null = null;
    let curr: TreeNode | null = root;
    // Morris In-Order Traversal
    while(curr !== null) {
        // No left subtree
        if(curr.left === null) {
            // visit
            if(prev !== null) {
                minDiff = Math.min(minDiff, curr.val - prev.val);
            }
            // update/set 'prev' and go right
            prev = curr;
            curr = curr.right;
        }
        // There is a left subtree
        else {
            // Get the inorder predecessor
            let predecessor = curr.left;
            while(predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }
            // No cycle to curr
            if(predecessor.right === null) {
                // create a cycle with curr
                predecessor.right = curr;
                // go left
                curr = curr.left;
            }
            // There is a cycle to curr
            else {
                // break the cycle
                predecessor.right = null;
                // visit
                if(prev !== null) {
                    minDiff = Math.min(minDiff, curr.val - prev.val);
                }
                // update/set 'prev' and go right
                prev = curr;
                curr = curr.right;
            }
        }
    }

    return minDiff;
};