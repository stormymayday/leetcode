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

function removeElements(head: ListNode | null, val: number): ListNode | null {

    const dummyNode = new ListNode(0, head);
    let prev = dummyNode;
    let current = head;

    while(current) {
        if (current.val === val) {
            prev.next = current.next; // delete current node by skipping over it
        } else {
            prev = current; // advance prev pointer if not deleting   
        }
        current = current.next; // advance current pointer
    }

    return dummyNode.next;
    
};