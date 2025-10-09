/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: _Node | null): _Node | null {

    if(root === null) {
        return root;
    }

    let curr: _Node | null = root;

    while(curr.left !== null) {

        // 1. Connecting children linked list style
        let head: _Node | null = curr;
        while(head != null) { // strict inequality '!==' causes an error
            // 1.1. left and right
            head.left.next = head.right;
            // 1.2. 'bridge'
            if(head.next != null) { // strict inequality '!==' causes an error
                head.right.next = head.next.left;
            }
            // 1.3. shift to a neighbor
            head = head.next;
        }

        // 2. Move down a level
        curr = curr.left

    }

    return root;

};