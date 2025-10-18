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

    const stack: _Node[] = [root];
    const visited: boolean[] = [false];

    while(stack.length > 0) {

        const currNode = stack.pop();
        const isVisited = visited.pop();

        if(isVisited === true) {
            res.push(currNode.val);
        } else {
            stack.push(currNode);
            visited.push(true);
            for(let i = currNode.children.length - 1; i >= 0; i -= 1) {

                stack.push(currNode.children[i]);
                visited.push(false);

            }

        }

    }

    return res;

};