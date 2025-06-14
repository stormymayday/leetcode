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
        return null;
    }

    let current = root;
    while(current !== null) {
        if(current.val > val) {
            current = current.left;
        } else if(current.val < val) {
            current = current.right;
        } else {
            return current;
        }
    }
    return null;
};