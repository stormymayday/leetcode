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

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {

    let currentPosition = 1;
    let currentNode = head;
    
    // Initialize beforeLeft to head instead of null to handle the edge case when left=1
    // If left=1, we won't enter the first while loop, and beforeLeft would remain its initial value
    // Later when we execute beforeLeft.next = prev, we'd get a null reference error if beforeLeft was null
    // By starting with head, we ensure beforeLeft is a valid node reference even in the edge case
    let beforeLeft = head;

    while(currentPosition < left) {
        // Keeping 'beforeLeft' one step behind 'currentNode'
        beforeLeft = currentNode;
        currentNode = currentNode.next;
        currentPosition++;
    }

    // to keep reference of the 'left' positioned node
    let leftPtr = currentNode;

    // This will be the new head if 'left' === 1
    let prev = null;
    // Reverse in between:
    while(currentPosition >= left && currentPosition <= right) {
        let next = currentNode.next;
        currentNode.next = prev;
        prev = currentNode;
        currentNode = next;

        currentPosition++;
    }

    // now currentNode is one step ahead of 'right'
    // prev is at 'right'

    // reconnecting the list:
    // The order matters!
    // In the edge case where left = 1 and there's only one node:
    // beforeLeft, leftPtr, and prev all reference the same node. 
    beforeLeft.next = prev;
    leftPtr.next = currentNode;

    // Edge Case: if left started at head
    if(left > 1) {
        return head;
    } else {
        // 'prev' will be new head
        return prev;
    }
    
};