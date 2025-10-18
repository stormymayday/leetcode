/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 * 
 *     constructor(val?: number, children?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */


function maxDepth(root: _Node | null): number {


    if (root === null) {
        return 0;
    }

    let queue: [_Node, number][] = [[root, 1]];

    let maxLevel = 1;

    while (queue.length > 0) {

        const nextQueue: [_Node, number][] = [];

        for (let i = 0; i < queue.length; i += 1) {

            const [currNode, currLevel] = queue[i];

            maxLevel = Math.max(maxLevel, currLevel);

            for (const child of currNode.children) {
                nextQueue.push([child, currLevel + 1]);
            }
        }

        queue = nextQueue;

    }

    return maxLevel;

};