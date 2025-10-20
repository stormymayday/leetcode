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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {

    let queue: [TreeNode | null, TreeNode | null][] = [[p, q]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, TreeNode][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [pNode, qNode] = queue[i];

            if(pNode === null && qNode === null) {
                continue;
            }

            if(
                (pNode === null || qNode === null) ||
                (pNode.val !== qNode.val)
            ) {
                return false;
            }

            nextQueue.push([pNode.left, qNode.left]);
            nextQueue.push([pNode.right, qNode.right]);

        }

        queue = nextQueue;

    }

    return true;
    
};