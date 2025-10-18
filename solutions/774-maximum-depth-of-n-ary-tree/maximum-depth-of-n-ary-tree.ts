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

    function helperDFS(node: _Node): number {

        if(node.children.length === 0) {
            return 1; // node with node children is at depth of 1
        }

        let maxSubtreeDepth = 0;
        for(const child of node.children) {
            maxSubtreeDepth = Math.max(maxSubtreeDepth, helperDFS(child));
        }

        return 1 + maxSubtreeDepth;

    }

    return helperDFS(root);

};