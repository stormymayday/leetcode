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

function reverseList(head: ListNode | null, prev: ListNode | null = null): ListNode | null {
    if(head === null) {
        return prev;
    }

    const next = head.next;
    head.next = prev;

    return reverseList(next, head);
};