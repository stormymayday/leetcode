/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     prev: _Node | null
 *     next: _Node | null
 *     child: _Node | null
 *     
 *     constructor(val?: number, prev? : _Node, next? : _Node, child? : _Node) {
 *         this.val = (val===undefined ? 0 : val);
 *         this.prev = (prev===undefined ? null : prev);
 *         this.next = (next===undefined ? null : next);
 *         this.child = (child===undefined ? null : child);
 *     }
 * }
 */


function flatten(head: _Node | null): _Node | null {

    if(!head) {
        return head;
    }

    let current = head;

    while(current) {

        if(current.child) {

            let childNode = current.child;

            while(childNode.next) {
                childNode = childNode.next;
            }

            childNode.next = current.next;
            if(current.next) {
                current.next.prev = childNode;
            }

            current.child.prev = current;
            current.next = current.child;

            current.child = null;

        }

        current = current.next;

    }

    return head;

};