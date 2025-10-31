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
function flatten(root: TreeNode | null): void {

    if (root === null) {
        return;
    }

    let curr: TreeNode | null = root;

    while (curr !== null) {
        // Check if there is a left subtree
        if (curr.left !== null) {
            // Find inorder predecessor (the rightmost node)
            let predecessor = curr.left;
            while (predecessor.right !== null) {
                predecessor = predecessor.right;
            }
            // Connect predecessor.right to curr.right
            predecessor.right = curr.right;

            // Point curr.right to curr.left
            curr.right = curr.left;

            // Disconnect curr.left
            curr.left = null;
        }

        // Go to the next node
        curr = curr.right
    }

};