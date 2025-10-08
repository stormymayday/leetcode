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

    let queue: (TreeNode | null)[] = [];
    queue.push(root.left, root.right);

    while (queue.length > 0) {

        // linear scan current level using two pointers
        let left = 0;
        let right = queue.length - 1;
        while (left < right) {
            // both nodes are 'null' - is fine
            if (queue[left] === null && queue[right] === null) {
                left += 1;
                right -= 1;
                continue;
            }
            // only one nodes is 'null' - not symmetric
            if (
                (queue[left] === null && queue[right] !== null) ||
                (queue[left] !== null && queue[right] === null)
            ) {
                return false;
            }
            // Both are not null, compare values
            if (queue[left].val !== queue[right].val) {
                return false;
            }
            left += 1;
            right -= 1;
        }

        const nextQueue: (TreeNode | null)[] = [];
        for (let i = 0; i < queue.length; i += 1) {
            const curr = queue[i];
            if (curr !== null) {
                nextQueue.push(curr.left);
                nextQueue.push(curr.right);
            }
        }

        if (nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return true;

};