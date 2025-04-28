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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {

    // Base Case:
    if(root === null) {
        return root;
    }

    if(key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if(key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        if(root.left === null) {
            return root.right;
        } else if(root.right === null) {
            return root.left;
        } else {
            // Finding min value
            let current = root.right;
            while(current.left !== null) {
                current = current.left;
            }
            // Assigning min value to current node
            root.val = current.val;
            // Deleting the node with min value from the right subtree
            root.right = deleteNode(root.right, current.val);
        }
    }

    return root;
    
};