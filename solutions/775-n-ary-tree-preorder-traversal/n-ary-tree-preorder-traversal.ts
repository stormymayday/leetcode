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

    function helperDFS(node: _Node | null): void {
        if(node === null) {
            return;
        }

        res.push(node.val);

        for(const child of node.children) {
            helperDFS(child);
        }
    }

    helperDFS(root);

    return res;

};