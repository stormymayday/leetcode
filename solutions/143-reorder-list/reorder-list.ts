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

/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {

    if(!head) {
        return;
    }

    // 1. Finding the middle:
    let slow = head;
    let fast = head.next;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // now 'slow' is at the middle
    // therefore, 'slow.next' is at the 'head' of the second list
    let second = slow.next;
    // split the list in half;
    slow.next = null;

    // 2. Reversing the second half:
    let prev = null;
    while(second) {
        let next = second.next;
        second.next = prev;
        prev = second;
        second = next;
    }
    // now 'prev' is the new 'head' of the second list

    // 3. Merging
    let first = head;
    second = prev;
    // Keep going util one of the pointers (first or second) is null
    // Since we know that second list can be shorter, we go with 'second'
    while(second) {

        // Saving references to next nodes for each list
        const firstNext = first.next;
        const secondNext = second.next;

        first.next = second;
        first = firstNext;

        second.next = first;
        second = secondNext;

    }
    
};