/**
 * Definition for node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

function postorder(root: _Node | null): number[] {

    const res: number[] = [];

    if(root === null) {
        return res;
    }

    const stack: [_Node, boolean][] = [[root, false]];

    while(stack.length > 0) {

        const [currNode, visited] = stack.pop();

        if(visited === true) {
            res.push(currNode.val);
        } else {
            stack.push([currNode, true]);
            const children = currNode.children;
            for(let i = children.length - 1; i >= 0; i -= 1) {
                stack.push([children[i], false]);
            }
        }

    }
    
    return res;

};