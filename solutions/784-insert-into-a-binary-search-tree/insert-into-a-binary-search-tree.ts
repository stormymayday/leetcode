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
        // smaller
        if(val < current.val) {
            // Left is open
            if(current.left === null) {
                current.left = newNode;
                return root;
            }
            // Left is occupied
            {
                current = current.left;
            }
        }
        // greater
        else if(val > current.val) {
            // Right is open
            if(current.right === null) {
                current.right = newNode;
                return root;
            }
            // Right is occupied
            else {
                current = current.right;
            }
        }
        // Optional - equals (not going to happen) 
        else {
            return root;
        }
    }
    
};