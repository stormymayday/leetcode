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
    while(true) {
        // Move slow pointer 1 step
        slow = slow.next;
        
        // Move fast pointer 1 step
        fast = fast.next;

        // Check if we've reached the end of the list - no cycle exists
        if(fast === null || fast.next === null) {
            return null;
        } else {
            // Move fast pointer another step (2 steps total per iteration)
            fast = fast.next;
        }

        // If pointers meet, we've found a cycle
        if(slow === fast) {
            break;
        }
    }

    // Phase 2: Find the start of the cycle
    let left = head;          // Reset one pointer to the head
    let right = slow;         // Keep the other at the meeting point
    
    // Move both pointers at the same speed (1 step)
    // They will meet at the start of the cycle
    while(left !== right) {
        left = left.next;
        right = right.next;
    }
    
    // Return the node where the cycle begins
    return left;
    
};