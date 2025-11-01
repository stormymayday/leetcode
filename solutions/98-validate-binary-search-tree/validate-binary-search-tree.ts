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

    if (root === null) {
        return true;
    }

    let prev: TreeNode | null = null;
    let curr: TreeNode | null = root;

    while (curr !== null) {

        if (curr.left === null) {

            // visit
            if (prev !== null && prev.val >= curr.val) {
                return false;
            }

            // go right
            prev = curr;
            curr = curr.right;

        } else {

            let predecessor = curr.left;
            while (predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }
            if (predecessor.right === null) {

                predecessor.right = curr;
                
                // prev = curr;
                curr = curr.left;

            } else {

                predecessor.right = null;

                // visit
                if (prev !== null && prev.val >= curr.val) {
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