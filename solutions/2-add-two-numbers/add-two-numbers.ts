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

    const dummyNode = new ListNode(-1, null);
    let current = dummyNode;

    let carry = 0;
    // Edge Case: check if carry remains
    while(l1 || l2 || carry) {

        // extracting the value if nodes exist
        const num1 = l1 ? l1.val : 0;
        const num2 = l2 ? l2.val : 0;

        // cacluating the result
        let result = num1 + num2 + carry;

        // calculating carry
        carry = Math.floor(result/10); // if result is less than 10 carry will be zero

        // if result is less than 10, modding it by 10 will not change it
        // otherwise, it will get the 'ones' place
        result = result % 10;

        const newNode = new ListNode(result);
        current.next = newNode;

        // Updating pointers
        current = current.next;
        if(l1) {
            l1 = l1.next;
        }
        if(l2) {
            l2 = l2.next;
        }

    }

    return dummyNode.next;
    
};