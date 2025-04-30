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

    // Edge Case: Empty Tree
    if(!root) {
        return root;
    }
    
    // Find the target node and it's parent
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

    // Early return if target was not found
    if(!current) {
        return root;
    }

    // Handle Node deletion based on children
    // Case 1: Target node has at most one child
    if(current.left === null || current.right === null) {

        // child becomes the non-null node (or null if no children)
        const child = current.left || current.right;

        // Edge Case: Target is root
        if(!parent) {
            // return child as the new root
            return child;
        }

        // Otherwise, we update the parent's reference to point to the child
        if(parent.left === current) {
            parent.left = child;
        } else {
            parent.right = child;
        }

    }
        // Case 2: Target Node has two children
        else {
            // Find the successor (smallest value in the right subtree) to replace the target node
            // 'par' tracks the parent of this min value node
            let par = null;
            let delNode = current;

            // Start by moving to the right subtree
            current = current.right;

            // Go as far left as possible to find the min value node
            while(current.left) {
                par = current;
                current = current.left;
            }

            // we went left alteast once
            if(par) {
                par.left = current.right;
                current.right = delNode.right;
            }

            // always updates successor's left to point to the deleted node's left subtree
            current.left = delNode.left;

            // Edge Case: Deleting the root
            if(!parent) {
                // return the successor as the new root
                return current;
            }

            // otherwise, update parent's reference to point to the successor
            if(parent.left === delNode) {
                parent.left = current;
            } else {
                parent.right = current;
            }
            
        }
        

    return root;
};