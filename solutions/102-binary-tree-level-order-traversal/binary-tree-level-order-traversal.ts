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

function levelOrder(root: TreeNode | null): number[][] {

    if(!root) {
        return [];
    }
    
    const queue = [];
    const result = [];

    queue.push(root);

    while(queue.length !== 0) {

        const level = [];

        let currentQueueLength = queue.length;
        for(let i = currentQueueLength; i > 0; i--) {

            const currentNode = queue.shift();

            level.push(currentNode.val);

            if(currentNode.left) {
                queue.push(currentNode.left);
            }

            if(currentNode.right) {
                queue.push(currentNode.right);
            }

        }

        result.push(level);

    }

    return result;

};