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

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    
    // Creating a dummy node at the beginning to help with edge case where left = 1
    // It will always point at the head
    const dummy = new ListNode(0, head);

    // Initializing pointers:
    let beforeLeft = dummy; // Will point at 'right' (where 'prev' will end up at)
    let current = head; // Will end up one step after 'right'

    // Moving 'current' to the left's position
    for(let i = 1; i < left; i++) {
        // Keeping beforeLeft one step behind:
        beforeLeft = current;
        current = current.next;
    }

    // Reversal in range:
    let prev = null; // will end up at 'right'
    for(let i = 0; i < right - left + 1; i++) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    // Re-linking
    // Left to after 'right' (current) first:
    beforeLeft.next.next = current;
    // Before left to 'right' (prev)
    beforeLeft.next = prev;

    return dummy.next;

};