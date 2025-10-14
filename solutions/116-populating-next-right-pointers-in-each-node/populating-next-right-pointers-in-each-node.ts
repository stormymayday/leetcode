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

    if (root === null) {
        return null;
    }

    let curr: _Node | null = root;
    let leftmost: _Node | null = root.left;

    while (leftmost != null) {

        while (curr != null) {

            curr.left.next = curr.right;

            if (curr.next != null) {
                curr.right.next = curr.next.left;
                curr = curr.next;
            } else {
                break;
            }

        }

        curr = leftmost;
        leftmost = curr.left;

    }

    return root;

};