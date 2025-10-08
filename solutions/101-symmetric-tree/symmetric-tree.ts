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

function isSymmetric(root: TreeNode | null): boolean {

    if (root === null) {
        return true;
    }

    let queue: (TreeNode | null)[] = [root.left, root.right];

    while (queue.length > 0) {

        // Two-Pointer linear scan current layer
        let left = 0;
        let right = queue.length - 1;
        while (left < right) {
            // Both not null and values differ
            if (
                (queue[left] !== null && queue[right] !== null) &&
                (queue[left].val !== queue[right].val)
            ) {
                return false;
            }

            // One is null, other is not
            if (
                (queue[left] === null && queue[right] !== null) ||
                (queue[left] !== null && queue[right] === null)
            ) {
                return false;
            }

            // Otherwise, advance
            left += 1;
            right -= 1;
        }

        // Prep Next layer
        const nextQueue: (TreeNode | null)[] = [];
        for (let i = 0; i < queue.length; i += 1) {
            const curr = queue[i];
            if(curr !== null) {
                nextQueue.push(curr.left);
                nextQueue.push(curr.right);
            }
        }
        queue = nextQueue;

    }

    return true;

};