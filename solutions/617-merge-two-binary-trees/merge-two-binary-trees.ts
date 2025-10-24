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

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {

    if(root1 === null) {
        return root2;
    }

    if(root2 === null) {
        return root1;
    }

    const newTree = new TreeNode(0);
    let queue: [TreeNode, TreeNode, TreeNode][] = [[newTree, root1, root2]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, TreeNode, TreeNode][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [resultNode, node1, node2] = queue[i];

            resultNode.val = node1.val + node2.val;

            if(node1.left !== null || node2.left !== null) {
                const resultLeft = new TreeNode(0);
                resultNode.left = resultLeft;
                nextQueue.push([resultLeft, node1.left || new TreeNode(0), node2.left || new TreeNode(0)]);
            }

            if(node1.right !== null || node2.right !== null) {
                const resultRight = new TreeNode(0);
                resultNode.right = resultRight;
                nextQueue.push([resultRight, node1.right || new TreeNode(0), node2.right || new TreeNode(0)]);
            }

        }

        queue = nextQueue;

    }

    return newTree;
    
};