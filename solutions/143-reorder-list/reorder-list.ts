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

/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
    
    const arr = [];
    let current = head;

    while(current) {
        arr.push(current);
        current = current.next;
    }

    let left = 0;
    let right = arr.length - 1;

    while(left < right) {

        arr[left].next = arr[right];
        left++;

        if(left >= right) {
            break;
        }

        arr[right].next = arr[left];
        right--;

    }

    arr[left].next = null;

};