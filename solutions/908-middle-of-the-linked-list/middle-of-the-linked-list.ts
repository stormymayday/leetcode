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

    let length = 0;
    let current = head;
    while(current !== null) {
        current = current.next;
        length++;
    }

    let n = Math.floor(length/2);
    current = head;
    while(n !== 0) {
        current = current.next;
        n--;
    }

    return current;
    
};