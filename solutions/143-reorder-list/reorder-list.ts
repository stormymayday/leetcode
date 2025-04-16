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
    
    // Lets create a dummy Node and attach it to the head
    const dummyNode = new ListNode(-1, head);
    // The next node will be the starting point of the reordered list

    let current = dummyNode;

    while(head) {
        
        // attach head
        current.next = head;

        // move head forward
        head = head.next; // can be null

        // move current forward
        current = current.next;
        
        // Search for 'tail'
        // start at 'new' head (was moved one step forward)
        let prev = head; // can be null
        if(prev) {
            // if not null
            let tail = prev.next; // can be null

            if(tail) {

                while(tail.next) {
                    prev = tail;
                    tail = tail.next;
                }

                // attach 'tail'
                current.next = tail;

                // shit 'current' forward
                current = current.next;

                // sever of the tail from the original list
                prev.next = null

            }

        }

    }

};