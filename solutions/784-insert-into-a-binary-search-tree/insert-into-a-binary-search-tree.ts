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

    // Creating a new TreeNode with a given value
    const newNode = new TreeNode(val);

    // Check if the tree is empty
    if(root === null) {
        root = newNode; // insert at the root
        return root;
    }

    // Otherwise, start at the root
    let current = root;
    while(true) {
        // value is less than current - check left
        if(val < current.val) {
            // left spot is open
            if(current.left === null) {
                current.left = newNode; // insert at left
                return root;
            }
            // left spot is occupied
            else {
                current = current.left; // traverse left
            }
        }
        // value is greater than current - check right 
        else if(val > current.val) {
            // right spot is open
            if(current.right === null) {
                current.right = newNode; // insert at right
                return root;
            }
            // right is occupied
            else {
                current = current.right; // traverse right
            }
        } 
        // Optional: value already exists 
        // It is guaranteed that the new value does not exist in the original BST
        else {
            return root;
        }

    }
    
};