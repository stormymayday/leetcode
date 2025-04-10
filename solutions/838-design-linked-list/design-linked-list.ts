class Node {
    value: number;
    next: Node | null;
    constructor(value: number) {
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

    // push
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

    pop(): void {
        if(!this.head) {
            return;
        } else {
            let temp = this.head;
            let before = this.head;
            while(temp.next) {
                before = temp;
                temp = temp.next;
            }
            this.tail = before;
            this.tail.next = null;
            this.length--;
            if(this.length === 0) {
                this.head = null;
                this.tail = null;
            }
        }
    }

    // unshift
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

    shift():void {
        if(!this.head) {
            return;
        } else {
            const temp = this.head;
            this.head = this.head.next;
            temp.next = null;
            this.length--;
            if(this.length === 0) {
                this.tail = null;
            }
        }
    }

    getNode(index: number): Node | undefined {
        if(index < 0 || index >= this.length) {
            return undefined;
        } else {
            let temp = this.head;
            for(let i = 0; i < index; i++) {
                temp = temp.next;
            }
            return temp;
        }
    }

    get(index: number): number {
        const node = this.getNode(index);
        if(node) {
            return node.value;
        } else {
            return - 1;
        }
    }

    // insert
    addAtIndex(index: number, val: number): void {
        if(index < 0 || index > this.length) {
            return;
        }

        if(index === 0) {
            return this.addAtHead(val);
        }

        if(index === this.length) {
            return this.addAtTail(val);
        }

        const before = this.getNode(index - 1);
        if(before && before.next) {
            const newNode = new Node(val);
            newNode.next = before.next;
            before.next = newNode;
            this.length++;
        }
    }

    // remove
    deleteAtIndex(index: number): void {
        if(index < 0 || index >= this.length) {
            return;
        }

        if(index === 0) {
            return this.shift();
        }

        if(index === this.length - 1) {
            return this.pop();
        }

        const before = this.getNode(index - 1);
        const target = before.next;
        before.next = target.next;
        target.next = null;
        this.length--;
    }

    reverse():void {

        if(!this.head) {
            return;
        }

        let temp = this.head;
        this.head = this.tail;
        this.tail = temp;

        let before = null;
        let after = null;

        while(temp) {
            after = temp.next;
            temp.next = before;
            before = temp;
            temp = after;
        }

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