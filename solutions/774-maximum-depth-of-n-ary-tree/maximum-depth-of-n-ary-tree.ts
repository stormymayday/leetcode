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

    if(root === null) {
        return 0;
    }

    let maxChildDepth = 0;
    for(const child of root.children) {
        maxChildDepth = Math.max(maxChildDepth, maxDepth(child));
    }

    return 1 + maxChildDepth;
    
};