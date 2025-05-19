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
            const temp = current; // temp points to the target node
            const next = current.next; // save reference to the current's next
            prev.next = current.next; // skip the node. Previous itself stays on the same node!
            temp.next = null; // unlink
            current = next; // advance current
        } else {
            prev = current; // advance prev
            current = current.next; // advance current
        }
    }

    return dummyNode.next;
    
};