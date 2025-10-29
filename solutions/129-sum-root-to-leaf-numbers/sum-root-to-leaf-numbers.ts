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

function sumNumbers(root: TreeNode | null): number {
    let sum: number = 0;

    if (root === null) {
        return sum;
    }

    let curr: TreeNode | null = root;
    let pathNum: number = 0;

    while (curr !== null) {
        if (curr.left === null) {
            // visit
            pathNum = pathNum * 10 + curr.val;

            // If leaf node
            if (curr.right === null) {
                sum += pathNum;
            }

            // go right
            curr = curr.right;
        } else {
            let predecessor = curr.left;
            let steps: number = 1;
            while (predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
                steps += 1;
            }
            if (predecessor.right === null) {
                predecessor.right = curr;

                // visit
                pathNum = pathNum * 10 + curr.val;

                curr = curr.left;
            } else {
                predecessor.right = null;

                // If predecessor is a leaf (no left child), we've reached a leaf
                if (predecessor.left === null) {
                    sum += pathNum;
                }

                // This part of tree is explored, backtrack
                for (let i = 1; i <= steps; i += 1) {
                    pathNum = Math.floor(pathNum / 10);
                }

                curr = curr.right;
            }
        }
    }

    return sum;
}