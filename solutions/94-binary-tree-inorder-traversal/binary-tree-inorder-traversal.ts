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

function inorderTraversal(root: TreeNode | null): number[] {

    const res: number[] = [];

    if(root === null) {
        return res;
    }

    let curr: TreeNode | null = root;
    
    while(curr !== null) {

        // check if there is NO left child
        if(curr.left === null) {
            // visit
            res.push(curr.val);
            // go right
            curr = curr.right;
        } 
        // otherwise, there IS a left child
        else {
            // find inorder predecessor (the right-most node) in the left subtree
            let predecessor: TreeNode | null = curr.left;
            while(predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }

            // check if there is no pseudo-cycle
            if(predecessor.right === null) {
                // create a pseudo-link back to curr
                predecessor.right = curr;
                // go left
                curr = curr.left;
            } 
            // otherwise, there is a pseudo-cycle
            else {
                // remove the pseudo-link
                predecessor.right = null;
                // visit
                res.push(curr.val);
                // go right
                curr = curr.right;

            }

        }

    }
    
    return res;
};