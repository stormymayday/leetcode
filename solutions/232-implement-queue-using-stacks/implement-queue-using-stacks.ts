class Node {
    value: number;
    next: Node | null;
    constructor(value: number) {
        this.value = value;
        this.next = null;
    }
}
class Stack {
    top: Node | null;
    length: number;
    constructor() {
        this.top = null;
        this.length = 0;
    }
    push(value: number): Stack {
        const newNode = new Node(value);
        if(!this.top) {
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.length++;
        return this;
    }
    pop(): number | undefined {
        if(!this.top) {
            return undefined;
        } else {
            const temp = this.top;
            this.top = this.top.next;
            temp.next = null;
            this.length--;
            return temp.value;
        }
    }
    peek(): number | undefined {
        if(!this.top) {
            return undefined;
        } else {
            return this.top.value;
        }
    }
}
class MyQueue {

    pushStack: Stack; 
    popStack: Stack;

    constructor() {
        this.pushStack = new Stack();
        this.popStack = new Stack();
    }

    push(x: number): void {
        this.pushStack.push(x);
    }

    pop(): number {
        // while(this.pushStack.peek() !== undefined) {
        //     this.popStack.push(this.pushStack.pop());
        // }
        // const temp = this.popStack.pop();
        // while(this.popStack.peek() !== undefined) {
        //     this.pushStack.push(this.popStack.pop());
        // }
        // return temp;

        if(this.popStack.peek() === undefined) {
            while(this.pushStack.peek() !== undefined) {
                this.popStack.push(this.pushStack.pop());
            }   
        }
        return this.popStack.pop();

        
    }

    peek(): number {
        // while(this.pushStack.peek() !== undefined) {
        //     this.popStack.push(this.pushStack.pop());
        // }
        // const temp = this.popStack.peek();
        // while(this.popStack.peek() !== undefined) {
        //     this.pushStack.push(this.popStack.pop());
        // }
        // return temp;

        if(this.popStack.peek() === undefined) {
            while(this.pushStack.peek() !== undefined) {
                this.popStack.push(this.pushStack.pop());
            }   
        }
        return this.popStack.peek();

    }

    empty(): boolean {

        if(this.pushStack.peek() === undefined && this.popStack.peek() === undefined) {
            return true;
        } else {
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