class MyQueue {

    pushStack: number[];
    popStack: number[];

    constructor() {
        this.pushStack = [];
        this.popStack = [];
    }

    push(x: number): void {
        this.pushStack.push(x);
    }

    pop(): number {
        while(this.pushStack.length > 0) {
            this.popStack.push(this.pushStack.pop());
        }

        const result = this.popStack.pop();

        while(this.popStack.length > 0) {
            this.pushStack.push(this.popStack.pop());
        }

        return result;
    }

    peek(): number {
        return this.pushStack[0];
    }

    empty(): boolean {
        return this.pushStack.length === 0;
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