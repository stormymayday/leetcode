/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     parent: _Node | null
 *     
 *     constructor(v: number) {
 *         this.val = v;
 *         this.left = null;
 *         this.right = null;
 *         this.parent = null;
 *     }
 * }
 */


function lowestCommonAncestor(p: _Node | null, q: _Node | null): _Node | null {

    if(p === null || q === null) {
        return null;
    }

    const visited = new Set<_Node>();
    visited.add(p);
    visited.add(q);

    while(p.parent !== null || q.parent !== null) {

        if(p.parent !== null) {
            if(visited.has(p.parent)) {
                return p.parent;
            } else {
                visited.add(p.parent);
                p = p.parent;
            }
        }

        if(q.parent !== null) {
            if(visited.has(q.parent)) {
                return q.parent;
            } else {
                visited.add(q.parent);
                q = q.parent;
            }
        }

    }

    return null;

};