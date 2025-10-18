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

    const stack: [_Node, number][] = [[root, 1]];

    let maxLevel = 1;

    while(stack.length > 0) {

        const [currNode, currLevel] = stack.pop();

        maxLevel = Math.max(maxLevel, currLevel);

        for(const child of currNode.children) {
            stack.push([child, currLevel + 1]);
        }

    }

    return maxLevel;

};