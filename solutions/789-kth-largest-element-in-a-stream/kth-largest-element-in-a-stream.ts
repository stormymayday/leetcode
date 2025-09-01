class KthLargest {
    private minHeap: number[];
    private k: number;
    constructor(k: number, nums: number[]) {
        this.k = k;
        this.minHeap = [...nums];
        if (this.minHeap.length > 0) {
            this.minHeap.sort((a, b) => a - b);
            while (this.minHeap.length > this.k) {
                this.minHeap.shift();
            }
        }

    }

    add(val: number): number {
        if (this.minHeap.length < this.k) {
            this.minHeap.push(val);
            this.minHeap.sort((a, b) => a - b);
        } else {
            if (val > this.minHeap[0]) {
                this.minHeap.shift();
                this.minHeap.push(val);
                this.minHeap.sort((a, b) => a - b);
            }
        }
        return this.minHeap[0];
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */