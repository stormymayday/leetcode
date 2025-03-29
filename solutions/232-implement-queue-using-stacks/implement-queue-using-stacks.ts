class MyQueue {

    // Stack used for pushing elements
    pushStack: number[];
     // Stack used for popping/peeking elements
    popStack: number[];

    constructor() {
        this.pushStack = [];
        this.popStack = [];
    }

    push(x: number): void {
        this.pushStack.push(x);
    }

    pop(): number {
        if (this.popStack.length === 0) {
            // If the pop stack is empty, transfer ALL elements from the push stack
            while (this.pushStack.length > 0) {
                this.popStack.push(this.pushStack.pop());
            }
        }
        // Pop the top element from the pop stack
        return this.popStack.pop();
    }

    peek(): number {
        if (this.popStack.length === 0) {
            // If the pop stack is empty, transfer ALL elements from the push stack
            while (this.pushStack.length > 0) {
                this.popStack.push(this.pushStack.pop());
            }
        }
        // 'peek' the top element from the pop stack
        return this.popStack[this.popStack.length - 1];
    }

    empty(): boolean {
        // Check if both stacks are empty
        if (this.pushStack.length === 0 && this.popStack.length === 0) {
            return true;
        } else {
            // Otherwise, the queue is not empty
            return false;
        }
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