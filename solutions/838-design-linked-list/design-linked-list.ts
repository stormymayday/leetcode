class Node {
    value: number;
    next: Node | null;
    constructor(value: number, nextNode: Node | null = null) {
        this.value = value;
        this.next = nextNode;
    }
}
class MyLinkedList {

    head: Node | null;
    tail: Node | null;

    constructor() {
        this.head = new Node(-1);
        this.tail = this.head;
    }

    get(index: number): number {
        
        let i = 0;
        let current = this.head.next;

        while(current){
            if(i === index) {
                return current.value;
            }
            current = current.next;
            i++;
        }

        return -1;

    }

    addAtHead(val: number): void {
        
        const newNode = new Node(val);

        newNode.next = this.head.next;
        this.head.next = newNode;

        if(newNode.next === null) {
            this.tail = newNode;
        }

    }

    addAtTail(val: number): void {
        const newNode = new Node(val);
        this.tail.next = newNode;
        this.tail = newNode;
    }

    addAtIndex(index: number, val: number): void {
        let i = 0;
        let prev = this.head;
        while (i < index && prev.next) {
            prev = prev.next;
            i++;
        }

        if (i === index) {
            const newNode = new Node(val);
            newNode.next = prev.next;
            prev.next = newNode;

            if (newNode.next === null) {
                this.tail = newNode;
            }
        }
    }

    deleteAtIndex(index: number): void {
        let i = 0;

        // Starting at the 'dummy' node
        let curr: Node | null = this.head;

        // Therefore, curr ends up on the node before the target
        while (i < index && curr) {
            // While 'i' is less than the 'index' AND 'curr' is not null
            i++;
            curr = curr.next;
        }

        // if curr and target exist ('index' is not out of bounds)
        if (curr && curr.next) {
            // if target is the tail
            if (curr.next === this.tail) {
                // move tail back
                this.tail = curr;
            }
            // Remove the node ahead of curr
            curr.next = curr.next.next;
            return;
        }
        // index was out of bounds
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