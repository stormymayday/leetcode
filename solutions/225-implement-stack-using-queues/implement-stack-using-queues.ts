class Node {
    value: number;
    next: Node | null;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class MyQueue {
    start: Node | null;
    end: Node | null;
    length: number;
    constructor() {
        this.start = null;
        this.end = null;
        this.length = 0;
    }

    enqueue(value): MyQueue {
        const newNode = new Node(value);
        if(!this.start) {
            this.start = newNode;
            this.end = newNode;
        } else {
            this.end.next = newNode;
            this.end = newNode;
        }
        this.length++;
        return this;
    }

    dequeue(): number | undefined {
        if(!this.start) {
            return undefined;
        } else {
            const temp = this.start;
            this.start = this.start.next;
            temp.next = null;
            this.length--;
            if(this.length === 0) {
                this.end = null;
            }
            return temp.value;
        }
    }

    peek(): number | undefined {
        if(!this.start) {
            return undefined;
        } else {
            return this.start.value;
        }
    }
    getEnd(): number | undefined {
        if(!this.end) {
            return undefined;
        } else {
            return this.end.value;
        }
    }
}

class MyStack {

    queue1: MyQueue;
    queue2: MyQueue;

    constructor() {
        this.queue1 = new MyQueue();
        this.queue2 = new MyQueue();
    }

    push(x: number): void {
        this.queue1.enqueue(x);
    }

    pop(): number | undefined {
        if(this.queue1.peek() === undefined) {
            return undefined;
        } else {
            while(this.queue1.length > 1) {
                this.queue2.enqueue(this.queue1.dequeue());
            }
            const temp = this.queue1.dequeue();
            while(this.queue2.peek() !== undefined) {
                this.queue1.enqueue(this.queue2.dequeue());
            }
            return temp;
        }
    }

    top(): number | undefined {
        if(this.queue1.peek() === undefined) {
            return undefined;
        } else {
            while(this.queue1.length > 1) {
                this.queue2.enqueue(this.queue1.dequeue());
            }
            const temp = this.queue1.peek();
            this.queue2.enqueue(this.queue1.dequeue());
            while(this.queue2.peek() !== undefined) {
                this.queue1.enqueue(this.queue2.dequeue());
            }
            return temp;
        }
    }

    empty(): boolean {
        return this.queue1.length === 0;
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */