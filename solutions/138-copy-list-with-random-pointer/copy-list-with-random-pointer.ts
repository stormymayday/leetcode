/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     next: _Node | null
 *     random: _Node | null
 * 
 *     constructor(val?: number, next?: _Node, random?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */


function copyRandomList(head: _Node | null): _Node | null {

    const hashMap = new Map([
        [null, null] // Edge Case: where pointer can be 'null'
    ]);

    // First Pass: cloning the nodes and adding to the map
    let current = head;
    while(current) {
        hashMap.set(current, new Node(current.val));
        current = current.next;
    }

    // Second Pass; setting the pointers
    current = head;
    while(current) {
        const copy = hashMap.get(current);

        copy.next = hashMap.get(current.next);
        copy.random = hashMap.get(current.random);

        current = current.next;
    }

    // Returning the copy via original 'head' reference
    // (using 'head' as the key)
    return hashMap.get(head);
    
};