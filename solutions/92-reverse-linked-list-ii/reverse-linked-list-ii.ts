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

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    
    let current = head;

    // start (initialized at head) - this caused an error!
    // let beforeLeft = null;
    let beforeLeft = head;

    let counter = 1; // currentPosition
    while(counter < left) {
        beforeLeft = current;
        current = current.next;
        counter++;
    }

    
    let leftPtr = current; // tail
    let prev = null; // newList
    //let next = null;

    // while(counter < right) {
     while(counter >= left && counter <= right) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;

        // forgot that
        counter++;
    }

    beforeLeft.next = prev;
    leftPtr.next = current;

    // return head;
    if(left > 1) {
        return head;
    } else {
        return prev;
    }

};