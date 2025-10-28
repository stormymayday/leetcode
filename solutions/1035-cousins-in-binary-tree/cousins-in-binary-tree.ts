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

function isCousins(root: TreeNode | null, x: number, y: number): boolean {

    if(root === null) {
        return false;
    }

    const dummyNode = new TreeNode(-Infinity);
    let queue: [TreeNode, TreeNode][] = [[root, dummyNode]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, TreeNode][] = [];
        let foundOne: boolean = false;
        let parentOfFound: TreeNode | null = null;

        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, parent] = queue[i];

            if(currNode.val === x || currNode.val === y) {
                if(foundOne === true) {
                    return parentOfFound !== parent;
                } else {
                    foundOne = true;
                    parentOfFound = parent;
                }
            }

            if(currNode.left !== null) {
                nextQueue.push([currNode.left, currNode]);
            }
            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currNode]);
            }

        }

        if(foundOne === true) {
            return false;
        }
        queue = nextQueue;

    }

    return false;
};