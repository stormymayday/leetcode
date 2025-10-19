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

function invertTree(root: TreeNode | null): TreeNode | null {

    if(root === null) {
        return null;
    }

    let queue: TreeNode[] = [root];
    
    while(queue.length > 0) {

        const nextQueue: TreeNode[] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            const temp: TreeNode | null = currNode.left;
            currNode.left = currNode.right;
            currNode.right = temp;

            if(currNode.left !== null) {
                nextQueue.push(currNode.left);
            }

            if(currNode.right !== null) {
                nextQueue.push(currNode.right);
            }

        }

        queue = nextQueue;

    }
    
    return root;

};