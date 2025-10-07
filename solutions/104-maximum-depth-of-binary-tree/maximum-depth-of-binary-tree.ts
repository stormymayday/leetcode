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

function maxDepth(root: TreeNode | null): number {
    
    return bfs(root);

};

function bfs(root: TreeNode | null): number {

    let levels = 0;

    if (root === null) {
        return levels;
    }

    let queue: TreeNode[] = [];
    queue.push(root);
    levels += 1;

    while (queue.length > 0) {

        const nextQueue: TreeNode[] = [];

        for (let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            if (currNode.left !== null) {
                nextQueue.push(currNode.left);
            }

            if (currNode.right !== null) {
                nextQueue.push(currNode.right);
            }

        }

        queue = nextQueue;

        if(queue.length > 0) {
            levels += 1;
        }

    }

    return levels;

}