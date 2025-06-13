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
    const dummyNode = new ListNode();
    let tail = dummyNode;

    let p1 = l1;
    let p2 = l2;
    let carry = 0;

    while(p1 !== null || p2 !== null || carry !== 0) {

        const val1 = p1 !== null ? p1.val : 0;
        const val2 = p2 !== null ? p2.val : 0;

        const currentSum = val1 + val2 + carry;
        let digit = 0;

        if(currentSum > 9) {
            digit = currentSum % 10;
            carry = 1;
        } else {
            digit = currentSum;
            carry = 0;
        }

        const newNode = new ListNode(digit);
        tail.next = newNode;
        tail = newNode;

        if(p1 !== null) {
            p1 = p1.next;
        }

        if(p2 !== null) {
            p2 = p2.next;
        }

    }

    return dummyNode.next;
};