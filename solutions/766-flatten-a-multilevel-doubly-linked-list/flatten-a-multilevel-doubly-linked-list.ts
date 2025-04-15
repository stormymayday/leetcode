/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     prev: _Node | null
 *     next: _Node | null
 *     child: _Node | null
 *     
 *     constructor(val?: number, prev? : _Node, next? : _Node, child? : _Node) {
 *         this.val = (val===undefined ? 0 : val);
 *         this.prev = (prev===undefined ? null : prev);
 *         this.next = (next===undefined ? null : next);
 *         this.child = (child===undefined ? null : child);
 *     }
 * }
 */


function flatten(head: _Node | null): _Node | null {

    // Edge Cases: if list is empty
    if(!head) {
        return head;
    }

    // Start at the head of the list
    let current = head;

    // Process each node in the list
    while(current) {

        // If the current node has a child list
        if(current.child) {

            // Find the tail node of the child list
            let childNode = current.child;
            while(childNode.next) {
                childNode = childNode.next;
            }

            // Connect the tail of the child list to current's next node
            childNode.next = current.next;
            
            // Update the prev pointer of current's next node (if it exists)
            if(current.next) {
                current.next.prev = childNode;
            }

            // Connect the head of the child list to the current node
            current.child.prev = current;
            current.next = current.child;

            // Remove the child pointer after flattening
            current.child = null;
        }

        // Move to the next node
        current = current.next;
    }

    // Return the head of the flattened list
    return head;
};