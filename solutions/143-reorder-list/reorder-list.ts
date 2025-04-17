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

    const dummyNode = new ListNode(-1, head);
    let current = dummyNode;
    let tail = null; // will be used for merging

    // Finding the length and the 'tail'
    let length = 0;
    while(current) {

        // Finding the 'tail'
        if(current.next === null) {
            tail = current;
        }

        current = current.next;
        if(current) {
            length++;
        }
    }

    // List is longer than 1 node
    if(length > 1) {

        // Finding the middle 'index'
        let mid;
        if(length % 2 === 0) {
            // If the length is even:
            mid = length/2;
        } else {
            // if the length is odd:
            mid = Math.ceil(length/2);
        }

        // Finding the middle node
        current = head; // will end up at the end of the first list
        let i = 1;
        while(i !== mid) {
            current = current.next;
            i++;
        }

        // now 'current' is at the 'tail' of the first list
        // therefore, current.next is at the 'head' of the second list

        // saving pointer reference
        let headTwo = current.next;

        // servering list in half
        current.next = null;

        // reversing the second half
        let prev = null;
        while(headTwo) {
            let next = headTwo.next;
            headTwo.next = prev;
            prev = headTwo;
            headTwo = next;
        }

        // now 'prev' is 'head' of the second list;

        // Merging two lists
        current = dummyNode;
        while(prev) {

            // starting from the first half:

            // attaching 'left'
            current.next = head;
            // moving head forward
            head = head.next;
            // moving current forward
            current = current.next;

            // Second List:

            // attaching 'right'
            current.next = prev;
            // moving prev 'backwards/forward'
            prev = prev.next;
            // moving current forward
            current = current.next;

        }

        // Edge Case: odd number of nodes
        // left will have a leftover node
        if(head) {
            current.next = head;
        }
        

    }
    
};