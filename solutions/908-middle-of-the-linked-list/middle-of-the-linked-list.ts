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

function middleNode(head: ListNode | null): ListNode | null {
    
    if(!head || !head.next) {
        return head;
    }

    let length = 1;
    let current = head;
    while(current.next) {
        current = current.next;
        length++;
    }

    current = head;
    let i = 1;
    // Even
    if(length % 2 === 0) {
        while(i !== length/2 + 1) {
            current = current.next;
            i++;
        }
        return current;
    } 
    // Odd
    else {
        while(i !== Math.ceil(length/2)) {
            current = current.next;
            i++;
        }
        return current;
    }

};