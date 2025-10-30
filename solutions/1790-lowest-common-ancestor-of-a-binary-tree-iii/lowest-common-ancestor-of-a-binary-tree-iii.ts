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

    if (p === null || q === null) {
        return null;
    }

    let pStart: _Node = p;
    let qStart: _Node = q;

    // until pointers converged
    while (p !== q) {
        
        // p has not reached the root yet
        if (p.parent !== null) {
            p = p.parent
        }
        // p has reached the root
        else {
            // restart p from 'qStart'
            p = qStart;
        }

        // q has not reached the root yet
        if (q.parent !== null) {
            q = q.parent
        }
        // q has reached the root
        else {
            // restart q from 'pStart'
            q = pStart;
        }
    }

    // can return either one
    return p;

};