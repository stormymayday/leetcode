class Node {
    value: number;
    next: Node | null;
    prev: Node | null;
    constructor(value: number) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export default class MyLinkedList {
    head: Node | null;
    tail: Node | null;
    length: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // extra
    getNode(index: number): Node | undefined {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        let temp = this.head;
        if (index < this.length / 2) {
            for (let i = 0; i < index; i++) {
                temp = temp!.next;
            }
        } else {
            temp = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                temp = temp!.prev;
            }
        }
        return temp as Node;
    }

    get(index: number): number {
        const node = this.getNode(index);
        if (node) {
            return node.value;
        } else {
            return -1;
        }
    }

    addAtHead(val: number): void {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    // extra
    removeAtHead(): void {
        if (this.length === 0) {
            return;
        }
        const temp = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null;
            temp!.next = null;
        }
        this.length--;
    }

    addAtTail(val: number): void {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    // extra
    removeAtTail(): void {
        if (this.length === 0) {
            return;
        }
        const temp = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail!.prev;
            this.tail!.next = null;
            temp!.prev = null;
        }
        this.length--;
    }

    addAtIndex(index: number, val: number): void {
        if (index < 0 || index > this.length) {
            return;
        }
        if (index === 0) {
            return this.addAtHead(val);
        }
        if (index === this.length) {
            return this.addAtTail(val);
        }

        const newNode = new Node(val);
        const before = this.getNode(index - 1);
        const after = before!.next;

        newNode.next = after;
        after!.prev = newNode;

        before!.next = newNode;
        newNode.prev = before!;

        this.length++;
    }

    deleteAtIndex(index: number): void {
        if (index < 0 || index >= this.length) {
            return;
        }

        if (index === 0) {
            return this.removeAtHead();
        }

        if (index === this.length - 1) {
            return this.removeAtTail();
        }

        const temp = this.getNode(index);

        temp!.prev!.next = temp!.next;
        temp!.next!.prev = temp!.prev;

        temp!.next = null;
        temp!.prev = null;

        this.length--;
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */