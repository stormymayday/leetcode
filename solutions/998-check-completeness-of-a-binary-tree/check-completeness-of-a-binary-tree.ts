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

function isCompleteTree(root: TreeNode | null): boolean {

    if (root === null) {
        return true;
    }

    let queue: (TreeNode | null)[] = [root];

    let nullFound: boolean = false;

    while (queue.length > 0) {

        const nextQueue: (TreeNode | null)[] = [];

        for (let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            if(currNode === null) {
                nullFound = true;
            } else {
                if(nullFound === true) {
                    return false;
                }
                nextQueue.push(currNode.left);
                nextQueue.push(currNode.right);
            }

        }

        queue = nextQueue;

    }

    return true;

};