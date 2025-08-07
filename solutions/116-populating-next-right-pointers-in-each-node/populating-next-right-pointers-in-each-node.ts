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
        const nextLayer: _Node[] = [];
        const n = queue.length;
        for(let i = 0; i < n; i += 1) {
            const current = queue.shift();

            if(i + 1 < n) {
                current.next = queue[0];
            }

            if(current.left) {
                nextLayer.push(current.left);
            }
            if(current.right) {
                nextLayer.push(current.right);
            }
        }
        queue = nextLayer;
    }
    return root;
};