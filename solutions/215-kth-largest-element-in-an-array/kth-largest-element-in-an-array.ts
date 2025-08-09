function findKthLargest(nums: number[], k: number): number {
    const minHeap = new MinHeap();
    minHeap.heapify(nums);
    while(minHeap.length > k) {
        minHeap.pop();
    }
    return minHeap.top();
};

class MinHeap {
    private heap: number[];
    public length: number;
    constructor() {
        this.heap = [];
        this.length = 0;
    }
    push(val: number):void {
        this.heap.push(val);
        this.length += 1;
        let currIdx = this.heap.length - 1;
        let parentIdx = Math.floor((currIdx - 1)/2);
        while(currIdx > 0 && this.heap[currIdx] < this.heap[parentIdx]) {
            const temp = this.heap[currIdx];
            this.heap[currIdx] = this.heap[parentIdx];
            this.heap[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1)/2);
        }
    }
    pop():number | null {
        if(this.heap.length === 0) {
            return null;
        }
        if(this.heap.length === 1) {
            this.length -= 1;
            return this.heap.pop();
        }
        const result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.length -= 1;
        this.sinkDown(0);
        return result;
    }
    sinkDown(index: number):void {
        let currIdx = index;
        while(currIdx < this.heap.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildVal = this.heap[leftChildIdx] === undefined ? Infinity : this.heap[leftChildIdx];
            const rightChildVal = this.heap[rightChildIdx] === undefined ? Infinity : this.heap[rightChildIdx];
            const smallerChildIdx = leftChildVal < rightChildVal ? leftChildIdx : rightChildIdx;
            if(this.heap[currIdx] > this.heap[smallerChildIdx]) {
                const temp = this.heap[currIdx];
                this.heap[currIdx] = this.heap[smallerChildIdx];
                this.heap[smallerChildIdx] = temp;
                currIdx = smallerChildIdx;
            } else {
                break;
            }
        }
    }
    heapify(nums: number[]):void {
        this.heap = [...nums]; // Make a copy to avoid mutating original
        this.length = this.heap.length;
        let currIdx = this.heap.length - 1;
        while(currIdx >= 0) {
            this.sinkDown(currIdx);
            currIdx -= 1;
        }
    }
    top(): number | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
}