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

function rotateRight(head: ListNode | null, k: number): ListNode | null {

    // Edge Case 1: empty list
    if(head === null) {
        return head;
    }

    // Finding length and the tail
    let length = 1; // starting from 1 initally
    let tail = head;
    while(tail.next) {
        tail = tail.next;
        length++;
    }

    // Edge Case 2: If length is equal to k we can return 
    if(length === k) {
        return head;
    }

    // Fidning the actual (if k > length) number or rotations
    const numberOfRotations = k % length;

    // Finding the pivot / break point
    let current = head;
    for(let i = 0; i < length - numberOfRotations - 1; i++) {
        current = current.next;
    }
    // now current is at the pivot point (new tail)

    // connecting tail to head
    tail.next = head;

    // shifting head to it's new position (next after pivot)
    head = current.next;

    // unlinking list at the pivot point
    current.next = null;
    
    return head;
    
};