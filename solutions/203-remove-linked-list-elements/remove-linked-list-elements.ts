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
            const temp = current; // Save reference to the node to be deleted
            const next = current.next; // Save current's next
            prev.next = current.next; // Skip the current node
            temp.next = null; // Explicitly unlink the node
            current = next; // Move to the next node
        } else {
            prev = current; // advance prev
            current = current.next; // advance current
        }
    }

    return dummyNode.next;
    
};