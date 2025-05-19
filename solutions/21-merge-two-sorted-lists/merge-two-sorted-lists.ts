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

    let dummyNode = new ListNode(0);
    let tail = dummyNode;
    let current1 = list1;
    let current2 = list2;
    
    while(current1 && current2) {
        if(current1.val < current2.val) {
            tail.next = current1;
            current1 = current1.next;
        } else {
            tail.next = current2;
            current2 = current2.next;
        }
        tail = tail.next;
    }

    if(current1) {
        tail.next = current1;
    }

    if(current2) {
        tail.next = current2;
    }

    return dummyNode.next;
    
};