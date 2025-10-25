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

/**
 Do not return anything, modify root in-place instead.
 */
function recoverTree(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    let node1: TreeNode | null = null;
    let node2: TreeNode | null = null;
    let prev: TreeNode | null = null;
    let curr: TreeNode | null = root;

    // Morris In-Order Traversal
    while (curr !== null) {
        // no left
        if (curr.left === null) {
            // Visit
            if (prev !== null) {
                // Found discrepancy!
                if (prev.val > curr.val) {
                    // First time: set both node1 and node2
                    if (node1 === null) {
                        node1 = prev;
                        node2 = curr;
                    }
                    // Second time: update node2
                    else {
                        node2 = curr;
                        // break;
                        // exiting early can create cycles!
                    }
                }
            }
            // Set/Update 'prev' and go Right
            prev = curr;
            curr = curr.right;
        } else {
            // Find inorder predecessor
            let predecessor = curr.left;
            while (predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }
            // No cycle
            if (predecessor.right === null) {
                // create a cycle with curr
                predecessor.right = curr;
                // keep going left
                curr = curr.left;
            }
            // Cycle with curr
            else {
                // break the cycle
                predecessor.right = null;
                // visit
                if (prev !== null) {
                    // Found discrepancy!
                    if (prev.val > curr.val) {
                        // First time: set both node1 and node2
                        if (node1 === null) {
                            node1 = prev;
                            node2 = curr;
                        }
                        // Second time: update node2
                        else {
                            node2 = curr;
                            // break;
                            // exiting early can create cycles!
                        }
                    }
                }
                // set/update 'prev' and go right
                prev = curr;
                curr = curr.right;
            }
        }
    }

    // Optional Guard
    if (node1 !== null && node2 !== null) {
        const temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
    }

};