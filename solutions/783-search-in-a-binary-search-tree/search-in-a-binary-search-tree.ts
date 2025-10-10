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
    
    if(root === null) {
        return root;
    }

    while(root !== null) {

        if(root.val === val) {
            return root;
        }

        // Smaller? Go Left
        if(val < root.val) {
            root = root.left;
        } 
        // Larger? Go Right
        else if(val > root.val) {
            root = root.right;
        }
    }

    return root;

};