function longestDiverseString(a: number, b: number, c: number): string {
    // 1. Initialize max priority queue
    const maxPQ = new CustomMaxPriorityQueue<string>();
    if(a > 0) {
        maxPQ.push("a", a);
    }
    if(b > 0) {
        maxPQ.push("b", b);
    }
    if(c > 0) {
        maxPQ.push("c", c);
    }

    // 2. Main Logic
    const res: string[] = [];
    while(maxPQ.length > 0) {
        // pop the topChar (with the highest count)
        let {val: topChar, prio: topCount} = maxPQ.pop();
        // Check if result has atleast 1 char AND last two chars equal topChar
        if(res.length > 1 && res[res.length - 1] === topChar && res[res.length - 2] === topChar) {
            // check if priority queue is empty after popping topChar
            if(maxPQ.length === 0) {
                // string cannot be extended anymore
                break;
            } 
            // Otherwise, pop the next character from priority queue
            else {
                // pop the char with the next highest count
                let {val: nextChar, prio: nextCount} = maxPQ.pop();
                // push it to the result
                res.push(nextChar);
                // decrement the count
                nextCount -= 1;
                // push it back to the priority queue if count is greater than 0
                if(nextCount > 0) {
                    maxPQ.push(nextChar, nextCount);
                }
            }
        }
        // Otherwise, push the topChar to the result
        else {
            res.push(topChar);
            topCount -= 1; // decrement the count
        }
        // If topChar count is greater than zero, push it back to the priority queue
        if(topCount > 0) {
            maxPQ.push(topChar, topCount);
        }
    }
    return res.join("");
    
};

class QueueNode<T> {
    val: T;
    prio: number;
    constructor(val: T, prio: number) {
        this.val = val;
        this.prio = prio;
    }
}

class CustomMaxPriorityQueue<T> {
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
    peek():number | null {
        return this.length > 0 ? this.data[0].prio : null;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}