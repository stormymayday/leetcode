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
    
    let before: ListNode | null = null;
    let current: ListNode | null = head;
    let after: ListNode | null = null;

    while(current) {
        after = current.next;
        current.next = before;
        before = current;
        current = after;
    }

    return before;

};