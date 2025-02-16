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

    let result = new ListNode();
    let current = result;

    let carry = 0;
    while(l1 || l2 || carry) {

        let v1 = l1 ? l1.val : 0;
        let v2 = l2 ? l2.val : 0;

        let sum = v1 + v2 + carry;
        carry = Math.floor(sum / 10);
        sum = sum % 10;

        current.next = new ListNode(sum);
        current = current.next

       l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;

    }

    return result.next;
    
};