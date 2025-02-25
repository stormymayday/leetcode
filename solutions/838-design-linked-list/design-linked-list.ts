class Node {
    value: number;
    next: Node | null;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class MyLinkedList {
    head: Node | null;
    tail: Node | null;
    length: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getNode(index: number): Node | undefined {
        if(index < 0 || index >= this.length) {
            return undefined;
        }
        let current = this.head;
        for(let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    get(index: number): number {
        const target = this.getNode(index);
        if(target) {
            return target.value;
        } else {
            return -1;
        }
    }

    addAtHead(val: number): void {
        const newNode = new Node(val);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
    }

    addAtTail(val: number): void {
        const newNode = new Node(val);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    removeAtHead():Node | undefined {
        if(!this.head) {
            return undefined;
        }
        const temp = this.head;
        this.head = this.head.next;
        this.length--;
        if(this.length === 0) {
            this.tail = null;
        }
        temp.next = null;
        return temp;
    }

    removeAtTail(): Node | undefined {
        if(!this.head) {
            return undefined;
        }
        let current = this.head;
        let beforeTail = this.head;
        while(current.next) {
            beforeTail = current;
            current = current.next;
        }
        this.tail = beforeTail;
        this.tail.next = null;
        this.length--;
        if(this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    addAtIndex(index: number, val: number): void {
        if(index < 0 || index > this.length) {
            return;
        }
        if(index === 0) {
            this.addAtHead(val);
            return;
        }
        if(index === this.length) {
            this.addAtTail(val);
            return;
        }
        const before = this.getNode(index - 1);
        if(before) {
            const newNode = new Node(val);
            newNode.next = before.next;
            before.next= newNode;
            this.length++;
        } else {
            return;
        }
    }

    deleteAtIndex(index: number): void {
        if(index < 0 || index >= this.length) {
            return;
        }
        if(index === 0) {
            this.removeAtHead();
            return;
        }
        if(index === this.length - 1) {
            this.removeAtTail();
            return;
        }
        const before = this.getNode(index - 1);
        const target = before.next;
        before.next = target.next;
        target.next = null;
        this.length--;
        return;
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