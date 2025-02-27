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
    let tail = head; // starting from head
    while(tail.next) {
        tail = tail.next;
        length++;
    }

    // If length is equak to k we can return 
    if(length === k) {
        return head;
    }

    // Fidning actual (if k > length) or rotations
    const numberOfRotations = k % length;

    // Move to the pivot point and rotate
    let current = head;
    // Correct:
    for(let i = 0; i < length - numberOfRotations - 1; i++) {
    // Error:
    // for(let i = 0; i < numberOfRotations; i++) {
    // Error:
    // for(let i = 0; i < numberOfRotations + 1; i++) {
        current = current.next;
    }
    // now current is at the pivot point (new head)

    // connecting tail to head
    tail.next = head;

    // shifting head to it's new position (next after pivot)
    head = current.next;

    // unlinling at pivot point
    current.next = null;
    
    return head;
    
};