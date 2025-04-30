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

    // Base Case
    if(root === null) {
        return null
    }

    if(key < root.val) {
        // recurse left
        root.left = deleteNode(root.left, key);
    } else if(key > root.val) {
        // recurse right
        root.right = deleteNode(root.right, key);
    } else {
        // Target is a leaf node
        if(root.left === null && root.right === null) {
            root = null;
        }
        // Target only has a left child
        else if(root.right === null) {
            root = root.left;
        }
        // Target only has a right child
        else if(root.left === null) {
            root = root.right;
        }
        // Target has both children
        else {
            // Find min for this sub tree
            let subTreeMin = root.right;
            while(subTreeMin.left !== null) {
                subTreeMin = subTreeMin.left;
            }
            // Re-assign root value
            root.val = subTreeMin.val;
            // Delete node with the min value
            root.right = deleteNode(root.right, subTreeMin.val);
        }
    }

    return root;
    
};