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
        return null;
    }

    let current = root;
    while(current) {
        if(current.val === val) {
            return current; // found
        } else if(current.val > val) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return current; // will be null if not found

};