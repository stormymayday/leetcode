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

function deleteDuplicates(head: ListNode | null): ListNode | null {

    if(!head || !head.next) {
        return head;
    }

    let current = head;

    while(current && current.next) {

        if(current.val === current.next.val) {
            // Skip the duplicate (current stays in place)
            current.next = current.next.next;
        } else {
            // Move to next node ONLY if no duplicate was found
            current = current.next;
        }

    }

    return head;

};