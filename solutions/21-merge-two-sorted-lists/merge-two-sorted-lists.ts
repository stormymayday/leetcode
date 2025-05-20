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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummyNode = new ListNode(0);
    let tail = dummyNode;
    let p1 = list1;
    let p2 = list2;
    while(p1 && p2) {
        if(p1.val < p2.val) {
            tail.next = p1;
            p1 = p1.next;
        } else {
            tail.next = p2;
            p2 = p2.next;
        }
        tail = tail.next;
    }
    if(p1) {
        tail.next = p1;
    }
    if(p2) {
        tail.next = p2;
    }
    return dummyNode.next;
};