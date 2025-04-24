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

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
    
    const newNode = new TreeNode(val);

    // Edge Case: Empty Tree
    if(!root) {
        root = newNode;
        return root;
    }

    let current = root;
    while(true) {

        // Value is smaller than current
        if(val < current.val) {
            // Left spot is empty
            if(current.left === null) {
                current.left = newNode;
                return root;
            } 
            // Left spot is occupied
            else {
                current = current.left; // traverse left
            }
        }
        // Value is larger than current
        else {
            // Right spot is empty
            if(current.right === null) {
                current.right = newNode;
                return root;
            }
            // Right spot is occupied
            else {
                current = current.right; // tarverse right
            }

        }

    }

};