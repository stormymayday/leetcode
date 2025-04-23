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

function getKthNode(node, k) {
    while(node && k > 0) {
        node = node.next;
        k--;
    }
    return node;
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {

    // Initialize dummy node and point it's 'next' at the 'head'
    const dummyNode = new ListNode(0, head);

    // Intialize a node that will stay just before the group
    let groupPrev = dummyNode;

    while(true) {

        // Get the Kth Node
        const kthNode = getKthNode(groupPrev, k);

        // If the Kth Node is out of bounds
        // Current group is not a multile of K
        if(!kthNode) {
            break;
        }

        // Otherwise:

        // Save reference to the node after Kth node
        const groupNext = kthNode.next;

        // Reverse current group
        let prev = groupNext; // to prevent breaking the list
        let current = groupPrev.next;
        while(current !== groupNext) {
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        // Tricky part: Updating the pointers
        // 1. Save reference to the (now) last node
        const temp = groupPrev.next;
        // 2. Set the new 'head' for the group
        groupPrev.next = kthNode;
        // 3. Update the groupPrev pointer for the next iteration
        groupPrev = temp;

    }

    return dummyNode.next;
    
};