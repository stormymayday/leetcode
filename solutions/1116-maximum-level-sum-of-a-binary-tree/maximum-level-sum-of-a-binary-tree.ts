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

function maxLevelSum(root: TreeNode | null): number {

    if(root === null) {
        return 0;
    }

    const res: number[] = [-Infinity, -Infinity];

    let queue: TreeNode[] = [root];
    let currLevel: number = 1;

    while(queue.length > 0) {

        const nextQueue: TreeNode[] = [];
        let levelSum = 0;

        for(let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            levelSum += currNode.val;

            if(currNode.left) {
                nextQueue.push(currNode.left);
            }

            if(currNode.right) {
                nextQueue.push(currNode.right);
            }

        }

        if(res[0] < levelSum) {
            res[0] = levelSum;
            res[1] = currLevel;
        }

        currLevel += 1;
        queue = nextQueue;

    }

    return res[1];
    
};