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
    head: Node<T> | null;
    tail: Node<T> | null;
    length: number;
    constructor() {
        this.head = this.tail = null;
        this.length = 0;
    }
    enqueue(value: T):CustomQueue<T> {
        const newNode = new Node(value);
        if(this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    dequeue(): T | undefined {
        if(!this.head) {
            return undefined;
        }
        const temp = this.head;
        this.head = this.head.next;
        temp.next = null;
        this.length--;
        if(this.length === 0) {
            this.tail = null;
        }
        return temp.value;
    }

}

function levelOrder(root: TreeNode | null): number[][] {

    if(!root) {
        return [];
    }

    const queue = new CustomQueue();
    const result: number[][] = [];

    let current = root;
    queue.enqueue(current);
    while(queue.length !== 0) {

        const level: number[] = [];
        const currentQueueLength = queue.length;

        for(let i = currentQueueLength; i > 0; i--) {

            current = queue.dequeue() as TreeNode;

            level.push(current.val);

            if(current.left) {
                queue.enqueue(current.left);
            }

            if(current.right) {
                queue.enqueue(current.right);
            }

        }

        result.push(level);

    }

    return result;
    
};