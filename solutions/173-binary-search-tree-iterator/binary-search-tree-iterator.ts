/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class SLLNode<T> {
    val: T;
    next: SLLNode<T> | null;
    constructor(val: T) {
        this.val = val;
        this.next = null;
    }
}

class BSTIterator {

    // current pointer for iteration
    private curr: SLLNode<number> | null;

    constructor(root: TreeNode | null) {

        const head = new SLLNode(-Infinity); // 'dummy' head (will need it's 'next' pointer later)
        let temp: SLLNode<number> | null = head; // temp pointer for traversal
        
        // 1. Build linked list in-order
        function inorderDFS(root: TreeNode | null): void {

            if(root === null) {
                return;
            }

            inorderDFS(root.left);

            const newNode = new SLLNode<number>(root.val);
            temp.next = newNode;
            temp = temp.next;

            inorderDFS(root.right);

        }

        inorderDFS(root);

        // Initialize 'curr'
        this.curr = head.next;

    }

    next(): number {
        const temp: SLLNode<number> | null = this.curr;
        this.curr = this.curr.next;
        temp.next = null; // (clean up) not really necessary
        return temp.val; 
    }

    hasNext(): boolean {
        return this.curr !== null;
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */