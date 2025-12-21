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

    const dummy = new ListNode();
    let curr = dummy;

    let p1 = l1;
    let p2 = l2;

    let carry = 0;

    while(p1 !== null || p2 !== null || carry !== 0) {

        let currSum = 0;
        if(p1 !== null) {
            currSum += p1.val;
        }
        if(p2 !== null) {
            currSum += p2.val;
        }
        currSum += carry;

        if(currSum >= 10) {
            currSum = currSum % 10;
            carry = 1;
        } else {
            carry = 0;
        }

        const newNode = new ListNode(currSum);

        curr.next = newNode;

        curr = curr.next;

        if(p1 !== null) {
            p1 = p1.next;
        }
        if(p2 !== null) {
            p2 = p2.next;
        }

    }

    return dummy.next;
    
};