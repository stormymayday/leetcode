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


function preorder(root: _Node | null): number[] {

    const res: number[] = [];

    if(root === null) {
        return res;
    }

    const stack: _Node[] = [root];

    while(stack.length > 0) {

        const currNode = stack.pop();

        res.push(currNode.val);

        const children = currNode.children;
        if(children.length > 0) {
            // going in reverse
            for(let i = children.length - 1; i >= 0; i -= 1) {
                stack.push(children[i]);
            }
        }

    }

    return res;

};