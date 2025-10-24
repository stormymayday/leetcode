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

function getMinimumDifference(root: TreeNode | null): number {

    let minDiff = Infinity;

    // Returns the previous node 
    function inorderDFS(node: TreeNode | null, prev: TreeNode | null): TreeNode | null {

        // Base Case
        if (node === null) {
            return prev; // Important! Must return 'prev'
        }

        // Recurse left with default 'prev' to get previous node for the current node
        const prevNode = inorderDFS(node.left, prev);

        // Check if prevNode is not null
        if (prevNode !== null) {
            // Update minDiff using prevNode's val
            minDiff = Math.min(minDiff, Math.abs(node.val - prevNode.val));
        }

        // Recurse right with current node as 'prev'
        return inorderDFS(node.right, node);

    }
    inorderDFS(root, null);
    return minDiff;

};