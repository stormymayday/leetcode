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

    // Handle empty list edge case
    if(!head) {
        return null;
    }

    // Initialize slow and fast pointers to the head
    let slow = head;
    let fast = head;

    // Phase 1: Detect if there's a cycle
    // Move slow pointer 1 step at a time, fast pointer 2 steps at a time
    while(fast && fast.next) {
        slow = slow.next;         // Move slow 1 step
        fast = fast.next.next;    // Move fast 2 steps
        
        // If pointers meet, we've found a cycle
        if(slow === fast) {
            break;
        }
    }

    // If fast or fast.next is null, we've reached the end of the list - no cycle exists
    if(!fast || !fast.next) {
        return null;
    } 
    // Phase 2: Find the start of the cycle
    else {
        let current = head;           // Reset one pointer to the head
        let meetingPoint = slow;      // Keep the other at the meeting point
        
        // Move both pointers at the same speed (1 step)
        // They will meet at the start of the cycle
        while(current !== meetingPoint) {
            current = current.next;
            meetingPoint = meetingPoint.next;
        }
        
        // Return the node where the cycle begins
        return current;
    }
    
};