/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *     
 *     constructor(v: number) {
 *         this.val = v;
 *         this.children = [];
 *     }
 * }
 */


function levelOrder(root: _Node | null): number[][] {
	// Edge Case: null root
    if(root === null) {
        return [];
    }

    let queue: _Node[] = [];
    queue.push(root);

    const res: number[][] = [];
    while(queue.length > 0) {

        const nextQueue: _Node[] = [];
        const currLevelRes: number[] = [];
        for(let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];
            currLevelRes.push(currNode.val);

            for(const child of currNode.children) {
                nextQueue.push(child);
            }

        }

        res.push(currLevelRes);
        if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }
    return res;
};