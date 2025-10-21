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


function diameter(root: _Node): number {

    let longestPath = 0;

    function helper(node: _Node): number {

        if(node.children.length === 0) {
            return 1;
        }

        let deepest = 0;
        let secondDeepest = 0;
        for(const child of node.children) {
            // const subtreeDepth = helper(child) + 1;
            const subtreeDepth = helper(child);
            if(subtreeDepth > deepest) {
                secondDeepest = deepest;
                deepest = subtreeDepth;
            } else if(subtreeDepth > secondDeepest) {
                secondDeepest = subtreeDepth;
            }

        }

        longestPath = Math.max(longestPath, deepest + secondDeepest);

        // return deepest;
        return deepest + 1;

    }

    helper(root);
 
    return longestPath;
    
};