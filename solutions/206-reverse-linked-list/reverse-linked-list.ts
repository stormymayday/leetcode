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

    // Edge Cases: list is empty or there is only one node
    if(!head || !head.next) {
        return head;
    }

    let prev = null;
    let current = head;

    while(current) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
};