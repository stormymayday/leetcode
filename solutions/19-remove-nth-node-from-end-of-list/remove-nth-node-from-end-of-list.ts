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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {

    if(!head) {
        return head;
    }

    // Helps with edge cases
    const dummyNode = new ListNode(-1, head);
    let current = dummyNode;

    // 1. Figure out the length:
    let length = 0;
    while(current) {
        current = current.next; // can be null
        if(current) {
            length++;
        }
    }

    // Check if 'n' is in range
    if(n > length) {
        return null;
    }
    // Now we know that 'n' is in range

    // 2. Get the 'target' node
    const targetIndex = length - n + 1;
    let prev = dummyNode;
    current = head;
    let i = 1;
    while(i !== targetIndex) {
        prev = current;
        current = current.next;
        i++;
    }
    // now 'current' is at the target index


    // 3. Removal
    prev.next = current.next;
    current.next = null;
    
    // 4. Return the 'new' head
    return dummyNode.next;
    
};