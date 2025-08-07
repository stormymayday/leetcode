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
    // Edge Case: null root
    if(root === null) {
        return root;
    }

    let queue: _Node[] = [];
    queue.push(root);
    while(queue.length > 0) {

        const nextLevel: _Node[] = [];
        const currentQueueLength = queue.length;

        for(let i = 0; i < currentQueueLength; i += 1) {

            const current = queue.shift();
            let next = null;
            if(i + 1 < currentQueueLength) {
                next = queue[0];
            }
            current.next = next;

            if(current.left !== null) {
                nextLevel.push(current.left);
            }
            if(current.right !== null) {
                nextLevel.push(current.right);
            }

        }

        queue = nextLevel;

    }
    return root;
};