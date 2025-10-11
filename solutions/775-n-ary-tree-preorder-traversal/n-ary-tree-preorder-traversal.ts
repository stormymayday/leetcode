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

    function dfs(root: _Node | null): void {
        if(root === null) {
            return;
        }

        res.push(root.val);

        for(const child of root.children) {
            dfs(child);
        }

    }

    dfs(root);

    return res;

};