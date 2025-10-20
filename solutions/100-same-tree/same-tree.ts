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

    if(p === null && q === null) {
        return true;
    }

    if(p === null || q === null) {
        return false;
    }

    let queue: [TreeNode, TreeNode][] = [[p, q]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, TreeNode][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [pNode, qNode] = queue[i];

            // Value Check
            if(pNode.val !== qNode.val) {
                return false;
            }

            // Structure Check - Left Subtree
            if(
                (pNode.left === null && qNode.left !== null) ||
                (pNode.left !== null && qNode.left === null)
            ) {
                return false;
            } else {
                if(pNode.left !== null && qNode.left !== null) {
                    nextQueue.push([pNode.left, qNode.left]);
                }
            }

            // Structure Check - Right Subtree
            if(
                (pNode.right === null && qNode.right !== null) ||
                (pNode.right !== null && qNode.right === null)
            ) {
                return false;
            } else {
                if(pNode.right !== null && qNode.right !== null) {
                    nextQueue.push([pNode.right, qNode.right]);
                }
            }

        }

        queue = nextQueue;

    }

    return true;
    
};