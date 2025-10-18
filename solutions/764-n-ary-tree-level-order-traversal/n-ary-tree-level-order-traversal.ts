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

    const res: number[][] = [];

    if(root === null) {
        return res;
    }

    function helperDFS(node: _Node, level: number): void {
        if(node === null) {
            return;
        }

        if(res[level] === undefined) {
            res[level] = [];
        }
        res[level].push(node.val);

        for(const child of node.children) {
            helperDFS(child, level + 1);
        }
    }

    helperDFS(root, 0);

    return res;
	
};