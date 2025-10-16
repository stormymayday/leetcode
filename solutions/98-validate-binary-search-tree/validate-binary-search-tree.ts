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

function isValidBST(root: TreeNode | null): boolean {

    if (root === null || (root.left === null && root.right === null)) {
        return true;
    }

    let curr: TreeNode | null = root;
    let prev: TreeNode | null = null;

    while(curr !== null) {
        if(curr.left === null) {
            
            // BST validation check
            if(prev !== null && prev.val >= curr.val) {
                return false;
            }

            prev = curr;
            curr = curr.right;


        } else {

            let predecessor = curr.left;
            while(predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }

            // There is no pseduo-link to curr (yet)
            if(predecessor.right === null) {
                // create a pseudo linl and go left
                predecessor.right = curr;
                curr = curr.left;
            } 
            // There is a pseudo-link to curr
            else {
                // remove the link
                predecessor.right = null;

                // BST Validation Check
                if(prev !== null && prev.val >= curr.val) {
                    return false;
                }

                // go right
                prev = curr;
                curr = curr.right;
            }

        }
    }

    return true;

};