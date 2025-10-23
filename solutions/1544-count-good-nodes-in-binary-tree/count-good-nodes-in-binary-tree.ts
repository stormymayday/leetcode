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

function goodNodes(root: TreeNode | null): number {

    let count = 0;

    if (root === null) {
        return count;
    }

    let queue: [TreeNode, number][] = [[root, root.val]];
    while (queue.length > 0) {

        const nextQueue: [TreeNode, number][] = [];

        for (let i = 0; i < queue.length; i += 1) {

            const [currNode, currMax] = queue[i];

            // current value is greater or equal than current max
            if (currNode.val >= currMax) {

                // increment the count and update the current max

                count += 1;

                if (currNode.left !== null) {
                    nextQueue.push([currNode.left, currNode.val]);
                }

                if (currNode.right !== null) {
                    nextQueue.push([currNode.right, currNode.val]);
                }

            }
            // current value is less than current max
            else {

                // keep current max the same

                if (currNode.left !== null) {
                    nextQueue.push([currNode.left, currMax]);
                }

                if (currNode.right !== null) {
                    nextQueue.push([currNode.right, currMax]);
                }

            }

        }

        queue = nextQueue;

    }

    return count;

};