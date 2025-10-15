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

function preorderTraversal(root: TreeNode | null): number[] {
    
    const res: number[] = [];

    if(root === null) {
        return res;
    }

    // Morris
    let curr: TreeNode | null = root;

    while(curr !== null) {

        // Check if there is NO left child
        if(curr.left === null) {
            // visit
            res.push(curr.val);
            // move right
            curr = curr.right; // Can be a loop via pseudo-link
        }
        // There IS a left child 
        else {
            // Find inorder predecessor (the rightmost node) of the left subtree
            let predecessor = curr.left;
            while(predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }

            if(predecessor.right === null) {
                // create a pseudo-link to curr
                predecessor.right = curr;
                // visit curr
                res.push(curr.val);
                // move left
                curr = curr.left;
            } 
            // predecessor.right points back at curr
            else {
                // remove the pseudo-link
                predecessor.right = null;
                // move right
                curr = curr.right;
                
            }

        }

    }
    
    return res;

};