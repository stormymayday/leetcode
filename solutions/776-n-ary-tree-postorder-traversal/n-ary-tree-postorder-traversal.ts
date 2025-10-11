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

    function helper(root: _Node | null): void {
        if(root === null) {
            return;
        }

        for(const child of root.children) {
            helper(child);
        }

        res.push(root.val);
    }

    helper(root);
    
    return res;

};