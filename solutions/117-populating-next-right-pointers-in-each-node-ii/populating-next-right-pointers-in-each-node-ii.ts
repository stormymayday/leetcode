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

    let head: _Node | null = root;

    while(head !== null) {

        const dummyNode = new _Node();
        let temp: _Node | null = dummyNode;

        while(head != null) {

            if(head.left !== null) {
                temp.next = head.left;
                temp = temp.next;
            }

            if(head.right !== null) {
                temp.next = head.right;
                temp = temp.next;
            }

            // neighbor hop
            head = head.next;
        }

        // move down a level
        head = dummyNode.next;

    }

    return root;

};