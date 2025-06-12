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

function isPalindrome(head: ListNode | null): boolean {
    const arr = [];
    let current = head;
    while(current) {
        arr.push(current.val);
        current = current.next;
    }
    let left = 0;
    let right = arr.length - 1;
    while(left < right) {
        if(arr[left] !== arr[right]) {
            return false;
        }
        left += 1;
        right -= 1;
    }
    return true;
};