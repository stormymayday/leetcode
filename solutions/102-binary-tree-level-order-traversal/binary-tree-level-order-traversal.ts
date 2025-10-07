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
    const res: number[][] = [];
    bfs(root, res);
    return res;
};

function bfs(root: TreeNode | null, res: number[][]): void {

    if (root === null) {
        return;
    }

    let queue: TreeNode[] = [];
    queue.push(root);

    while (queue.length > 0) {

        const nextQueue: TreeNode[] = [];
        const currLevelNodes: number[] = [];

        for (let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            currLevelNodes.push(currNode.val);

            if (currNode.left !== null) {
                nextQueue.push(currNode.left);
            }

            if (currNode.right !== null) {
                nextQueue.push(currNode.right);
            }

        }

        res.push(currLevelNodes);
        queue = nextQueue;

    }

    return;

}