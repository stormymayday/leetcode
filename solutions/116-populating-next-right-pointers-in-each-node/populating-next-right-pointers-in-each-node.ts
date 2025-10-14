/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: _Node | null): _Node | null {

    if(root === null) {
        return null;
    }

    let queue: _Node[] = [root];

    while(queue.length > 0) {

        const nextQueue: _Node[] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            if(i + 1 < queue.length) {
                const neighborNode = queue[i + 1];
                currNode.next = neighborNode;
            }

            if(currNode.left !== null) {
                nextQueue.push(currNode.left);
            }

            if(currNode.left !== null) {
                nextQueue.push(currNode.right);
            }

        }

        queue = nextQueue;

    }

    return root;
    
};