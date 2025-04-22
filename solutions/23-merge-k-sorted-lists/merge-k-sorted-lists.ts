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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {

    // Edge Case: empty lists array
    if(lists.length === 0) {
        return null;
    }

    // Step 1: Extract all the values
    const values = [];
    for(let i = 0; i < lists.length; i++) {
        let list = lists[i];
        while(list) {
            values.push(list.val);
            list = list.next;
        }
    }

    // Step 2: Sorting the values
    values.sort((a, b) => a - b);

    // Step 3: Create new sorted linked list
    const dummyNode = new ListNode();
    let current = dummyNode;
    for(let i = 0; i < values.length; i++) {
        const value = values[i];
        const newNode = new ListNode(value);
        current.next = newNode;
        current = current.next;
    }
    
    // Step 4: Return the sorted linked list
    return dummyNode.next;
};