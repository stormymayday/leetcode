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
        return null;
    }
    let current = head;
    let before = null;
    while(current) {
        let next = current.next;
        current.next = before;
        before = current;
        current = next;
    }
    return before;
};