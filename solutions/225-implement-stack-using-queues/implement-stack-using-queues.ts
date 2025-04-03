class Node {
    value: number;
    next: Node | null;
    constructor(value: number) {
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

    enqueue(value: number): MyQueue {
        const newNode = new Node(value);
        if (!this.start) {
            this.start = newNode;
            this.end = newNode;
        } else {
            this.end!.next = newNode;
            this.end = newNode;
        }
        this.length++;
        return this;
    }

    dequeue(): number | undefined {
        if (!this.start) {
            return undefined;
        } else {
            const temp = this.start;
            this.start = this.start.next;
            temp.next = null;
            this.length--;
            if (this.length === 0) {
                this.end = null;
            }
            return temp.value;
        }
    }

    peek(): number | undefined {
        if (!this.start) {
            return undefined;
        } else {
            return this.start.value;
        }
    }

}

class MyStack {

    queue: MyQueue;

    constructor() {
        this.queue = new MyQueue();
    }

    push(x: number): void {
        this.queue.enqueue(x);
    }

    pop(): number | undefined {
        if (this.queue.length === 0) {
            return undefined;
        } else {
            let n = this.queue.length;
            while(n > 1) {
                this.queue.enqueue(this.queue.dequeue());
                n--;
            }
            const temp = this.queue.dequeue();
            return temp;
        }
    }

    top(): number | undefined {
        if (this.queue.length === 0) {
            return undefined;
        } else {
            let n = this.queue.length;
            while(n > 1) {
                this.queue.enqueue(this.queue.dequeue());
                n--;
            }
            const temp = this.queue.peek();
            this.queue.enqueue(this.queue.dequeue());
            return temp;
        }
    }

    empty(): boolean {
        return this.queue.length === 0;
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