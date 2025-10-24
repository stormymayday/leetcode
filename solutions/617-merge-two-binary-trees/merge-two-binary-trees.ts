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

    let queue: [TreeNode, TreeNode][] = [[root1, root2]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, TreeNode][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [node1, node2] = queue[i];

            node1.val = node1.val + node2.val;

            if(node1.left !== null && node2.left !== null) {
                nextQueue.push([node1.left, node2.left]);
            } else if(node1.left === null && node2.left !== null) {
                const newNode = new TreeNode(0);
                node1.left = newNode;
                nextQueue.push([node1.left, node2.left]);
            } else if(node1.left !== null && node2.left === null) {
                const newNode = new TreeNode(0);
                node2.left = newNode;
                nextQueue.push([node1.left, node2.left]);
            }

            if(node1.right !== null && node2.right !== null) {
                nextQueue.push([node1.right, node2.right]);
            } else if(node1.right === null && node2.right !== null) {
                const newNode = new TreeNode(0);
                node1.right = newNode;
                nextQueue.push([node1.right, node2.right]);
            } else if(node1.right !== null && node2.right === null) {
                const newNode = new TreeNode(0);
                node2.right = newNode;
                nextQueue.push([node1.right, node2.right]);
            }

        }

        queue = nextQueue;

    }

    return root1;
    
};