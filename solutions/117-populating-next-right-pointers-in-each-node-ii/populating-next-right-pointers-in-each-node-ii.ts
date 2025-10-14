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
    if (root === null) {
        return root;
    }
    
    // Connect children of current node
    if (root.left != null) {
        if (root.right != null) {
            root.left.next = root.right;
        } else {
            root.left.next = getNextRight(root.next);
        }
    }
    
    if (root.right != null) {
        root.right.next = getNextRight(root.next);
    }
    
    // IMPORTANT: Process right subtree first!
    // This ensures next pointers are set up for the left subtree to use
    connect(root.right);
    connect(root.left);
    
    return root;
}

// Helper: Find the next right node at the same level
function getNextRight(node: _Node | null): _Node | null {
    while (node != null) {
        if (node.left != null) return node.left;
        if (node.right != null) return node.right;
        node = node.next;
    }
    return null;
}