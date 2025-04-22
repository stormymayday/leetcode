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

// Helper method:
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

    // Interval represents the gap between lists to merge
    // It doubles with each iteration (1, 2, 4, ...)
    let interval = 1;

    // Iterate until interval matches the length
    while(interval < lists.length) {

        // Merge pairs of lists with current interval
        for(let i = 0; i < lists.length - interval; i += interval * 2) {
            lists[i] = merge(lists[i], lists[i + interval]);
        }

        // Double the interval
        interval *= 2;

    }

    // The first list now contains the fully merged result
    return lists[0];
    
};