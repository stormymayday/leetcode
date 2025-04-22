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

// Helper Method
function merge(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummyNode = new ListNode();
    let current = dummyNode;
    while(list1 && list2) {
        if(list1.val < list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    if(list1) {
        current.next = list1;
    }
    if(list2) {
        current.next = list2;
    }
    return dummyNode.next;
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    
    // Edge Case: empty lists array
    if(lists.length === 0) {
        return null;
    }

    // Pairwise merge from left to right:
    for(let i = 0; i < lists.length; i++) {
        lists[i] = merge(lists[i - 1] || null, lists[i]);
    }

    // The last list will now contain result of all previous merges:
    return lists[lists.length - 1];

};