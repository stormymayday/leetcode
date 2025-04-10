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

function reverseList(head: ListNode | null): ListNode | null {

    if(!head) {
        return head;
    }

    let current = head;
    let before = null;
    let next = null;

    while(current) {
        next = current.next;
        current.next = before;
        before = current;
        current = next;
    }

    return before;
    
};