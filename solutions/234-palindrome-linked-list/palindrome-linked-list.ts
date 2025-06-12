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
    // 1. Find middle
    let slow = head;
    let fast = head;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // 'slow' is at the middle now

    // 2. Reverse second half (using slow as a head for the second half)
    let prev = null;
    while(slow) {
        const temp = slow.next;
        slow.next = prev;
        prev = slow;
        slow = temp;
    }

    // 3. Check if palindrome using two pointers
    let left = head;
    let right = prev;
    while(right) {
        if(left.val !== right.val) {
            return false;
        }
        left = left.next;
        right = right.next;
    }
    return true;
};