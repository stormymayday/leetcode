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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {

    // Base Case 1: Not Found
    if(root === null) {
        return root;
    }

    // Base Case 2: Found
    if(val === root.val) {
        return root;
    }

    if(val < root.val) {
        return searchBST(root.left, val);
    } else {
        return searchBST(root.right, val);
    }
    
};