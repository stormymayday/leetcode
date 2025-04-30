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
    // Edge case: empty tree
    if (!root) {
        return null;
    }
    
    // Special case: deleting the root with 0 or 1 child
    if (root.val === key) {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // Root has two children - handled below (falls through to main algorithm)
    }
    
    // Find the node to delete and its parent
    let parent: TreeNode | null = null;
    let current = root;
    
    // Search for the node to delete
    while (current && current.val !== key) {
        parent = current;
        if (key < current.val) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    
    // If the key wasn't found in the tree
    if (!current) {
        return root;
    }
    
    // Handle node deletion
    // Case 1: Node has 0 or 1 child
    if (!current.left || !current.right) {
        // Determine which child exists (or null if no children)
        const child = current.left || current.right;
        
        // Connect parent to child, bypassing current
        if (parent) {
            if (parent.left === current) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        } else {
            // We're deleting the root (which has 0 or 1 child)
            return child;
        }
    }
    // Case 2: Node has 2 children - use value swap approach
    else {
        // Find the minimum value in the right subtree (successor)
        let successorVal = findMinValue(current.right);
        
        // Replace current's value with successor's value
        current.val = successorVal;
        
        // Now delete the successor node (which has the value we just moved up)
        // Note: we know the successor only has a right child (or no children)
        deleteSuccessor(current, current.right, successorVal);
    }
    
    return root;
}

// Helper function to find minimum value in a subtree
function findMinValue(node: TreeNode): number {
    let current = node;
    while (current.left) {
        current = current.left;
    }
    return current.val;
}

// Helper function to delete the successor node (node with minimum value)
function deleteSuccessor(parent: TreeNode, node: TreeNode, value: number): void {
    let prev = parent;
    let current = node;
    
    // Find the successor node and its parent
    while (current && current.val !== value) {
        prev = current;
        current = current.left; // The successor is always to the left
    }
    
    // The successor is found, delete it
    // Note: successor can only have a right child (or no children)
    if (prev.left === current) {
        prev.left = current.right;
    } else {
        prev.right = current.right;
    }
}