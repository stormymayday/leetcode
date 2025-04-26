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

    if(!root) {
        return root;
    }

    let current = root;
    while(current) {
        if(val < current.val) {
            current = current.left;
        } else if(val > current.val) {
            current = current.right;
        } else {
            return current;
        }
    }
    
    // if val is not found inside the loop, current is null
    return current;
    
};