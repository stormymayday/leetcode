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

    while(!set.has(current)) {

        if(current.next === null) {
            return null;
        }

        set.add(current);

        current = current.next;

    }

    return current;
    
};