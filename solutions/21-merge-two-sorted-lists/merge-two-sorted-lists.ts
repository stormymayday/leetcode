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
    // Base Case 1
    if(!list1 && !list2) {
        return null;
    }

    // Base Case 2
    if(!list1) {
        return list2;
    }

    // Base Case 3
    if(!list2) {
        return list1;
    }

    // Recursive Step
    if(list1.val < list2.val) {
        const next1 = list1.next;
        list1.next = mergeTwoLists(next1, list2);
        return list1;
    } else {
        const next2 = list2.next;
        list2.next = mergeTwoLists(next2, list1);
        return list2;
    }
};