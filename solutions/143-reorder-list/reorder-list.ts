/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
    const dummyNode = new ListNode();
    let current = dummyNode;

    let left = head;

    while (left) {
        // left first
        let temp = left;
        left = left.next; // can be null
        temp.next = null; // sever connection
        current.next = temp; // attach left

        current = current.next; // move current

        // right last
        let prev = left; // can be null
        if (prev) {
            let right = prev.next; // can be null

            if (right) {
                while (right.next) {
                    // stop when 'right' is last
                    prev = right;
                    right = right.next;
                }

                current.next = right; // attach 'right'
                prev.next = null; // sever connection

                current = current.next; // move current forward
            }
        }
    }

    //return dummyNode.next;
    // return is void
}