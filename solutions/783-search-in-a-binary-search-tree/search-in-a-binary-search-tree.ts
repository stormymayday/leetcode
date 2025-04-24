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

    // Edge Case: Empty Tree
    if(root === null) {
        return root;
    }

    // start at the root
    let current = root;
    // iterate until current runs into null or value is found
    while(current) {
        // value is less than current
        if(val < current.val) {
            current = current.left; // traverse left
        }
        // value is greater than current
        else if(val > current.val) {
            current = current.right; // traverse right
        }
        // value equals to current
        else {
            return current;
        }
    }

    // value was not found
    return null;

};