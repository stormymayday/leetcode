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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    // creating dummy node
    let result = new ListNode();
    // current pointer
    let current = result;

    // carray intially 0
    let carry = 0;

    // while current listNodes exist OR carry still has value left
    while(l1 || l2 || carry) {

        // extracting values from listNodes if nodes exist
        let val1 = l1 ? l1.val : 0;
        let val2 = l2 ? l2.val : 0;

        // calculating sum and carry
        let sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        sum = sum % 10;

        // creating new listNode 
        current.next = new ListNode(sum);
        // moving current pointer forward
        current = current.next;

        // moving listNode pointers forward if nodes exist
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;

    }

    return result.next;
    
};