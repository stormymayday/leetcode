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

    // Edge Case: Empty root
    if(!root) {
        return root;
    }

    // Search for a node o remove (and it's parent)
    let parent = null;
    let current = root;
    while(current && current.val !== key) {
        parent = current;
        if(key < current.val) {
            current = current.left;
        } else {
            current = current.right;
        }
    }

    // The node was not found
    if(!current) {
        return root;
    }

    // Otherwise, node exists
    // Node has at most one child
    if(!current.left || !current.right) {

        // Can be left, right or null
        const child = current.left || current.right;

        // Edge Case: target node is the root
        if(!parent) {
            // return child as the new root
            return child;
        }

        // if the target is on the left
        if(parent.left === current) {
            parent.left = child;
        } 
        // target is on the right
        else {
            parent.right = child;
        }

    } 
    // target node has two children
    else {

        // Find the successor (smallest value in the right subtree)
        let par = null; // Parent of the successor node
        let delNode = current; // Save the node to be deleted

        // Start by moving to the right subtree
        current = current.right;
        // Go as far left as possible to find the min value node
        while(current.left) {
            par = current;
            current = current.left;
        }

        // After this, 'current' points to the successor (smallest node in right subtree)

        // Scenario 1: If we moved left at least once (par is not null)
        // We need to "extract" the successor from its current position
        if(par) {
            // The successor's parent points to the successor's right child (WHY?)
            par.left = current.right;
            // The successor takes the place of the deleted node, so it needs to point to the right subtree of the deleted node
            current.right = delNode.right;
        }

        // Scenario 2: If we didn't move left at all (par is null)
        // This means the direct right child of the node to delete is the successor
        // We don't update the right pointer of the successor, as it's already correctly pointing to the rest of the right subtree

        // This happens in both scenarios - the successor node needs to point to the left subtree of the deleted node.
        current.left = delNode.left;

        // Edge Case: Deleting the root
        if(!parent) {
            return current;  // Return the successor as the new root
        }

        // Otherwise, update parent's reference to point to the successor
        if(parent.left === delNode) {
            parent.left = current;
        } else {
            parent.right = current;
        }

    }

    return root;
};