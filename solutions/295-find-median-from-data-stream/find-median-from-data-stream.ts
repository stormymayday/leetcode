class MedianFinder {
    private smallNums: MaxHeap;
    private largeNums: MinHeap;
    constructor() {
        this.smallNums = new MaxHeap();
        this.largeNums = new MinHeap();
    }

    addNum(num: number): void {
        // Arbitraritly adding to the small nums
        this.smallNums.push(num);

        // Every item in smallNums must be smaller than every item in the largeNums
        if(
            // Both heaps must not be empty first
            this.smallNums.peek() !== null && this.largeNums.peek() !== null &&
            this.smallNums.peek() > this.largeNums.peek()

        ) {
            this.largeNums.push(this.smallNums.pop());
        }

        // Compare lengths, difference should not be more than 1
        if(Math.abs(this.smallNums.length - this.largeNums.length) > 1) {
            if(this.smallNums.length > this.largeNums.length) {
                this.largeNums.push(this.smallNums.pop());
            } else {
                this.smallNums.push(this.largeNums.pop());
            }
        }
    }

    findMedian(): number {
        if(this.smallNums.length > 0 || this.largeNums.length > 0) {
            if(this.smallNums.length > this.largeNums.length) {
                return this.smallNums.peek();
            } else if(this.largeNums.length > this.smallNums.length) {
                return this.largeNums.peek();
            } else {
                return (this.smallNums.peek() + this.largeNums.peek()) / 2;
            }
        } else {
            return -Infinity; // heaps are empty (should not happen)
        }
    }
}

class MinHeap {
    private data: number[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: number): void {
        this.data.push(val);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.data[currIdx] < this.data[parentIdx]) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): number | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
            this.length = 0;
            return this.data.pop();
        }
        const root = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return root;
    }
    siftDown(idx: number): void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildVal = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx];
            const rightChildVal = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx];
            const smallerChildIdx = leftChildVal < rightChildVal ? leftChildIdx :rightChildIdx;
            const smallerChildVal = leftChildVal < rightChildVal ? leftChildVal : rightChildVal;
            if(this.data[currIdx] > smallerChildVal) {
                const temp = this.data[currIdx];
                this.data[currIdx] = this.data[smallerChildIdx];
                this.data[smallerChildIdx] = temp;
                currIdx = smallerChildIdx;
            } else {
                break;
            }
        }
    }
    heapify(nums: number[]): void {
        this.data = [...nums];
        this.length = nums.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    peek(): number | null {
        return this.length > 0 ? this.data[0] : null;
    }
}

class MaxHeap {
    private data: number[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: number): void {
        this.data.push(val);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.data[currIdx] > this.data[parentIdx]) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): number | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
            this.length = 0;
            return this.data.pop();
        }
        const root = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return root;
    }
    siftDown(idx: number): void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildVal = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx];
            const rightChildVal = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx];
            const biggerChildIdx = leftChildVal > rightChildVal ? leftChildIdx :rightChildIdx;
            const biggerChildVal = leftChildVal > rightChildVal ? leftChildVal : rightChildVal;
            if(this.data[currIdx] < biggerChildVal) {
                const temp = this.data[currIdx];
                this.data[currIdx] = this.data[biggerChildIdx];
                this.data[biggerChildIdx] = temp;
                currIdx = biggerChildIdx;
            } else {
                break;
            }
        }
    }
    heapify(nums: number[]): void {
        this.data = [...nums];
        this.length = nums.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    peek(): number | null {
        return this.length > 0 ? this.data[0] : null;
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */