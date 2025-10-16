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

function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {

    if (root === null || p === null) {
        return null;
    }

    let curr: TreeNode | null = root;
    let prev: TreeNode | null = null;

    // Phase 1: find 'p'
    while (curr !== null) {

        // 'p' is on the left
        // This is a potential 'successor'
        if (p.val < curr.val) {
            prev = curr;
            curr = curr.left;
        }
        // 'p' is on the right
        else if (p.val > curr.val) {
            curr = curr.right;
        }
        // found 'p'! (curr === p)
        else {
            // Phase 2: find the successor (leftmost node in the right subtree)
            // First, check if there is a right subtree
            if (curr.right !== null) {
                curr = curr.right;
                while (curr.left !== null) {
                    curr = curr.left;
                }
                return curr;
            }
            // If there is not right subtree, prev must be the successor
            else {
                return prev;
            }

        }

    }

    return null;

};