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

function detectCycle(head: ListNode | null): ListNode | null {
    if(!head) {
        return null;
    }

    const set = new Set();
    let current = head;
    while(current) {
        if(set.has(current)) {
            return current;
        } else {
            set.add(current);
        }
        current = current.next;
    }
    return null;
};