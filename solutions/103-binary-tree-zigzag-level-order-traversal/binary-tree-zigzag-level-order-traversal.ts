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

function zigzagLevelOrder(root: TreeNode | null): number[][] {

    const res: number[][] = [];

    if (root === null) {
        return res;
    }

    let queue: TreeNode[] = [root];
    let level: number = 0;

    while (queue.length > 0) {

        const nextQueue: TreeNode[] = [];
        const levelVals: number[] = [];
        for (let i = 0; i < queue.length; i += 1) {
            const currNode = queue[i];
            levelVals.push(currNode.val);
            if (currNode.left !== null) {
                nextQueue.push(currNode.left);
            }
            if (currNode.right !== null) {
                nextQueue.push(currNode.right);
            }
        }


        queue = nextQueue;
        if (level % 2 === 0) {
            res.push(levelVals);
        } else {
            res.push(levelVals.reverse());
        }
        level += 1;

    }

    return res;

};