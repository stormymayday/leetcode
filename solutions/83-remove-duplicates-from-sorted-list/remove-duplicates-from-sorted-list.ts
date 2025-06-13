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

function deleteDuplicates(head: ListNode | null): ListNode | null {
    const dummyNode = new ListNode(0, head);
    let tail = dummyNode.next;
    while(tail && tail.next) {
        if(tail.val === tail.next.val) {
            // skip
            tail.next = tail.next.next;
        } else {
            tail = tail.next;
        }
    }
    return dummyNode.next;
};