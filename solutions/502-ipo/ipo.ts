function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
    const minCapital = new CustomMinprioQueue<number>();
    const maxProfit = new CustomMaxprioQueue<number>();

    for(let i = 0; i < capital.length; i += 1) {
        const cap = capital[i];
        const prof = profits[i];
        minCapital.push(prof, cap);
    }

    for(let i = 0; i < k; i += 1) {
        while(minCapital.length > 0 && w >= minCapital.top()) {
            const { val:prof, prio:cap } = minCapital.pop();
            maxProfit.push(cap, prof);
        }
        if(maxProfit.top() !== null) {
            const { val:cap, prio:prof } = maxProfit.pop();
            w += prof;
        } else {
            break;
        }
    }

    return w;
};

class QueueNode<T> {
    val: T;
    prio: number;
    constructor(val: T, prio: number) {
        this.val = val;
        this.prio = prio;
    }
}

class CustomMinprioQueue<T> {
    private data: QueueNode<T>[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: T, prio: number): void {
        const newNode = new QueueNode(val, prio);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.data.length - 1;
        this.siftUp(currIdx);
    }
    siftUp(idx: number): void {
        let currIdx = idx;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.data[currIdx].prio < this.data[parentIdx].prio) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): QueueNode<T> | null {
        if(this.data.length === 0) {
            return null;
        }
        if(this.data.length === 1) {
            this.length -= 1;
            return this.data.pop();
        }
        const result = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return result;
    }
    siftDown(idx: number):void {
        let currIdx = idx;
        while(currIdx < this.data.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildprio = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx].prio;
            const rightChildprio = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx].prio;
            const smallerChildPrioIdx = leftChildprio < rightChildprio ? leftChildIdx : rightChildIdx;
            const smallerChildPrio = leftChildprio < rightChildprio ? leftChildprio : rightChildprio;
            if(this.data[currIdx].prio > smallerChildPrio) {
                const temp = this.data[currIdx];
                this.data[currIdx] = this.data[smallerChildPrioIdx];
                this.data[smallerChildPrioIdx] = temp;
                currIdx = smallerChildPrioIdx;
            } else {
                break;
            }
        }
    }
    remove(idx: number): void {
        if(idx < 0 || idx >= this.data.length) {
            return;
        }
        
        // If removing the last element, just pop it
        if(idx === this.data.length - 1) {
            this.data.pop();
            this.length -= 1;
            return;
        }
        
        // Move last element to the position we're removing
        this.data[idx] = this.data.pop()!;
        this.length -= 1;
        
        // Fix data property - might need to sift up or down
        const parentIdx = Math.floor((idx - 1) / 2);
        
        // If we have a parent and current node is smaller, sift up
        if(idx > 0 && this.data[idx].prio < this.data[parentIdx].prio) {
            this.siftUp(idx);
        } else {
            // Otherwise, try sifting down
            this.siftDown(idx);
        }
    }
    top():number | null {
        return this.length > 0 ? this.data[0].prio : null;
    }
}

class CustomMaxprioQueue<T> {
    private data: QueueNode<T>[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: T, prio: number):void {
        const newNode = new QueueNode(val, prio);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        this.siftUp(currIdx);
    }
    siftUp(idx: number): void {
        let currIdx = idx;
        let parentIdx = Math.floor((currIdx - 1)/2);
        while(currIdx > 0 && this.data[currIdx].prio > this.data[parentIdx].prio) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1)/2);
        }
    }
    pop():QueueNode<T> | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
            this.length -= 1;
            return this.data.pop();
        }
        const max = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return max;
    }
    siftDown(idx: number): void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPrio = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx].prio;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx].prio;
            const biggerChildIdx = leftChildPrio > rightChildPrio ? leftChildIdx : rightChildIdx;
            const biggerChildPrio = leftChildPrio > rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].prio < biggerChildPrio) {
                const temp = this.data[currIdx];
                this.data[currIdx] = this.data[biggerChildIdx];
                this.data[biggerChildIdx] = temp;
                currIdx = biggerChildIdx;
            } else {
                break;
            }
        }
    }
    remove(idx: number): void {
        if(idx < 0 || idx >= this.data.length) {
            return;
        }
        
        // If removing the last element, just pop it
        if(idx === this.data.length - 1) {
            this.data.pop();
            this.length -= 1;
            return;
        }
        
        // Move last element to the position we're removing
        this.data[idx] = this.data.pop()!;
        this.length -= 1;
        
        // Fix data property - might need to sift up or down
        const parentIdx = Math.floor((idx - 1) / 2);
        
        // If we have a parent and current node is smaller, sift up
        if(idx > 0 && this.data[idx].prio < this.data[parentIdx].prio) {
            this.siftUp(idx);
        } else {
            // Otherwise, try sifting down
            this.siftDown(idx);
        }
    }
    top():number | null {
        return this.length > 0 ? this.data[0].prio : null;
    }
}