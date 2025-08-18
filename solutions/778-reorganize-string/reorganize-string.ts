function reorganizeString(s: string): string {
    // Count character frequency
    const frequencyCount = new Map<string, number>();
    for(let i = 0; i < s.length; i += 1) {
        const char = s[i];
        if(!frequencyCount.has(char)) {
            frequencyCount.set(char, 0);
        }
        frequencyCount.set(char, frequencyCount.get(char) + 1);
    }
    
    // Initalize priority queue
    const maxPQ = new CustomMaxPriorityQueue<string>();
    for(const [char, count] of frequencyCount.entries()) {
        maxPQ.push(char, count);
    }
    
    // Main Logic
    const result: string[] = [];
    while(maxPQ.length >= 2) {
        // Process top 2 chars
        const {val: topChar, prio: topCount} = maxPQ.pop();
        const {val: nextChar, prio: nextCount} = maxPQ.pop();
        result.push(topChar);
        result.push(nextChar);
        // Put chars back with updated count
        if(topCount - 1 > 0) {
            maxPQ.push(topChar, topCount - 1);
        }
        if(nextCount - 1 > 0) {
            maxPQ.push(nextChar, nextCount - 1);
        }
    }

    if(maxPQ.length === 1) {
        const {val: topChar, prio: topCount} = maxPQ.pop();
        if(topCount !== 1 || topChar === result[result.length - 1]) {
            return "";
        } else {
            result.push(topChar);
            return result.join("");
        }
    } else {
        return result.join("");
    }

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