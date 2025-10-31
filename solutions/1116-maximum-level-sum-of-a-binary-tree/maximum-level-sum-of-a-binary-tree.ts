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

    let maxLevelSum: number = -Infinity;
    let maxLevel: number = 0;

    if(root === null) {
        return maxLevel;
    }

    let queue: TreeNode[] = [root];
    let level: number = 1;

    while(queue.length > 0) {

        const nextQueue: TreeNode[] = [];
        let levelSum: number = 0;

        for(let i = 0;i < queue.length; i += 1) {

            const currNode = queue[i];
            levelSum += currNode.val;
            if(currNode.left !== null) {
                nextQueue.push(currNode.left);
            }
            if(currNode.right !== null) {
                nextQueue.push(currNode.right);
            }
        }

        if(levelSum > maxLevelSum) {
            maxLevelSum = levelSum;
            maxLevel = level;
        }
        level += 1;
        queue = nextQueue;

    }

    return maxLevel;
    
};