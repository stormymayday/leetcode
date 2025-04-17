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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {

    // Helps with edge cases
    const dummyNode = new ListNode(-1, head);

    // Initialize two pointers
    let left = head;
    let right = head;

    // 1. Advance 'right' n positions forward
    let i = 0;
    while(i < n && right) {
        right = right.next;
        i++;
    }

    // 2. Move all pointers forward until 'right' goes out of bounds
    let prev = dummyNode; // for deletion
    while(right) {

        prev = left; // keeping 'prev' one step behind 'left'
        left = left.next;
        right = right.next;

    }

    // 3. Removal
    prev.next = left.next;
    left.next = null; // optinal cleanup

    return dummyNode.next;
    
};