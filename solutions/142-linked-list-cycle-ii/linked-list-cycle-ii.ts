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

    let slow = head;
    let fast = head;

    // while(fast.next && fast.next.next) {
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast) {
            break;
        }
    }

    if(!fast || !fast.next) {

        return null;

    } else {
        let current = head;
        let meetingPoint = slow;

        while(current !== meetingPoint) {
            current = current.next;
            meetingPoint = meetingPoint.next;
        }

        return current;
    }
    
};