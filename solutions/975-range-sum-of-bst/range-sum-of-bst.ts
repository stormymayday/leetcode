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
    // Base Case
    if(root === null) {
        return 0;
    }

    // If current val is greater than 'high'
    if(root.val > high) {
        // Search Left
        return rangeSumBST(root.left, low, high);
    }

    // If current val is smaller than 'low'
    if(root.val < low) {
        // Search Right
        return rangeSumBST(root.right, low, high); 
    }

    // Otherwise, the value is in range - sum it up
    return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high); 
};