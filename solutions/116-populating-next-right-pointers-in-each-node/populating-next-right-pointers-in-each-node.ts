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
    // Edge Case: null root
    if(root === null) {
        return null;
    }
    let leftmost: _Node | null = root;
    while(leftmost.left !== null) {
        let temp = leftmost; // for moving horizontally
        while(temp) {
            // 1. Connect children of the same parent
            temp.left.next = temp.right;

            // Check if temp can move right
            if(temp.next) {
                // 2. Connect left parent's right node to the right parent's left node
                temp.right.next = temp.next.left;
            }

            // move temp to the right
            temp = temp.next;
        }
        leftmost = leftmost.left; // go down to the next level
    }
    return root;
};