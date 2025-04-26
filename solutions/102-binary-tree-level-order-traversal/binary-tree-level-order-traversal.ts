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

class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class CustomQueue<T> {
    first: Node<T> | null;
    last: Node<T> | null;
    length: number;

    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    enqueue(value: T): CustomQueue<T> {
        const newNode = new Node(value);

        // check if queue is empty
        if (this.length === 0) {
            // queue is empty
            this.first = newNode;
            this.last = newNode;
        } else {
            // queue is not empty
            this.last!.next = newNode;
            this.last = newNode;
        }
        this.length++;
        return this;
    }

    dequeue(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        const temp = this.first;
        this.first = this.first!.next;
        temp!.next = null;
        this.length--;
        if (this.length === 0) {
            this.last = null;
        }
        return temp!.value;
    }
}

function levelOrder(root: TreeNode | null): number[][] {

    // Edge Case: Empty Tree
    if(!root) {
        return [];
    }

    // Initialize queue and results array
    const queue = new CustomQueue<TreeNode>();
    const result: number[][] = [];

    // Set a pointer at the root
    let current = root;

    // Enqueue the root
    queue.enqueue(current);

    // Iterate while queue is not empty
    while(queue.length !== 0) {

        // to hold values at each level
        const level = [];
        const currentQueueLength = queue.length;
        for(let i = currentQueueLength; i > 0; i--) {

            // dequeue the node
            current = queue.dequeue();

            // push the value int current LEVEL array
            level.push(current.val);

            // check left
            if(current.left) {
                queue.enqueue(current.left);
            }

            // check right
            if(current.right) {
                queue.enqueue(current.right);
            }

        }

        result.push(level);

    }

    return result;
};