class KthLargest {
    minHeap: MinHeap;
    k: number;
    constructor(k: number, nums: number[]) {
        this.k = k;
        this.minHeap = new MinHeap();
        this.minHeap.heapify(nums);
        while(this.minHeap.length > k) {
            this.minHeap.pop();
        }
    }

    add(val: number): number {
        if(this.minHeap.length < this.k) {
            this.minHeap.push(val);
        } else {
            if(val > this.minHeap.top()) {
                this.minHeap.pop();
                this.minHeap.push(val);
            }
        }
        return this.minHeap.top();
    }
}

class MinHeap {
    private data: number[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: number):void {
        this.data.push(val);
        this.length += 1;
        let currIdx = this.data.length - 1;
        let parentIdx = Math.floor((currIdx - 1)/2);
        while(currIdx > 0 && this.data[currIdx] < this.data[parentIdx]) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1)/2);
        }
    }
    pop():number | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
            this.length -= 1;
            return this.data.pop();
        }
        const root = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return root;
    }
    siftDown(idx:number):void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildVal = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx];
            const rightChildVal = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx];
            const smallerChildIdx = leftChildVal < rightChildVal ? leftChildIdx : rightChildIdx;
            const smallerChildVal = leftChildVal < rightChildVal ? leftChildVal : rightChildVal;
            if(this.data[currIdx] > smallerChildVal) {
                const temp = this.data[currIdx];
                this.data[currIdx] = smallerChildVal;
                this.data[smallerChildIdx] = temp;
                currIdx = smallerChildIdx;
            } else {
                break;
            }
        }
    }
    heapify(nums: number[]):void {
        this.data = [...nums];
        this.length = nums.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top():number | null {
        return this.length > 0 ? this.data[0] : null;
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */