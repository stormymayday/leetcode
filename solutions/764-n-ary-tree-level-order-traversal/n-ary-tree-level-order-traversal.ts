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

    const res: number[][] = [];

    if(root === null) {
        return res;
    }

    let queue: _Node[] = [root];

    while(queue.length > 0) {

        const nextQueue: _Node[] = [];
        const currLayer: number[] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            currLayer.push(currNode.val);

            for(const child of currNode.children) {

                nextQueue.push(child);
                
            }

        }
        
        res.push(currLayer);
        queue = nextQueue;

    }

    return res;
	
};