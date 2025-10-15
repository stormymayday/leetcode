/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 * 
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */


function connect(root: _Node | null): _Node | null {

    if(root === null) {
        return null;
    }

    let curr: _Node | null = root;

    while(curr !== null) {

        const dummyNode = new _Node(-1);
        let temp: _Node | null = dummyNode;

        while(curr != null) {

            if(curr.left !== null) {
                temp.next = curr.left;
                temp = temp.next;
            }

            if(curr.right !== null) {
                temp.next = curr.right;
                temp = temp.next;
            }

            curr = curr.next;

        }

        curr = dummyNode.next;

    }

    return root;
    
};