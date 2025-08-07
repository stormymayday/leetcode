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
    const result: number[][] = [[root.val]];
    let queue: _Node[] = [root];
    while(queue.length > 0) {
        const nextLayer: _Node[] = [];
        const n = queue.length;
        const temp: number[] = [];
        for(let i = 0; i < n; i += 1) {
            const current = queue.shift();
            for(const child of current.children) {
                nextLayer.push(child);
                temp.push(child.val);
            }
        }
        queue = nextLayer;
        if(temp.length !== 0) {
            result.push([...temp]);
        }
    }
    return result;
};