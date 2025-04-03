class Node {
    value: number;
    next: Node | null;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class MyStack {
    top: Node | null;
    bottom: Node | null;
    height: number;
    constructor() {
        this.top = null;
        this.bottom = null;
        this.height = 0;
    }
    push(value): MyStack {
        const newNode = new Node(value);
        if(!this.top) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.height++;
        return this;
    }

    pop():number | undefined {
        if(!this.top) {
            return undefined;
        } else {
            const temp = this.top;
            this.top = this.top.next;
            temp.next = null;
            this.height--;
            if(this.height === 0) {
                this.bottom = null;
            }
            return temp.value;
        }
    }

    peek():number | undefined {
        if(!this.top) {
            return undefined;
        } else {
            return this.top.value;
        }
    }

    getBottom():number | undefined {
        if(!this.bottom) {
            return undefined;
        } else {
            return this.bottom.value;
        }
    }
}

class MyQueue {

    pushStack: MyStack;
    popStack: MyStack;

    constructor() {
        this.pushStack = new MyStack();
        this.popStack = new MyStack();
    }

    push(x: number): void {
        this.pushStack.push(x);
    }

    pop(): number | undefined {
        if(this.empty()) {
            return undefined;
        } else {
            if(this.popStack.height === 0) {
                while(this.pushStack.height > 0) {
                    this.popStack.push(this.pushStack.pop());
                }
            }
            return this.popStack.pop();
        }
    }

    peek(): number | undefined {
        if(this.empty()) {
            return undefined;
        } else {
            if(this.popStack.height === 0) {
                while(this.pushStack.height > 0) {
                    this.popStack.push(this.pushStack.pop());
                }
            }
            return this.popStack.peek();
        }
    }

    empty(): boolean {
        return this.pushStack.height === 0 && this.popStack.height === 0;
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */