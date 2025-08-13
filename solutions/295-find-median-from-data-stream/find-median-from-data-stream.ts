class MedianFinder {
    smallNums: MaxHeap;
    largeNums: MinHeap;
    constructor() {
        this.smallNums = new MaxHeap();
        this.largeNums = new MinHeap();
    }

    addNum(num: number): void {
        // 1. Arbitrarily adding num into smallerNums
        this.smallNums.push(num);

        // 2. Check if all nums in smallNums are smaller than all numbers in largeNums
        if(
            // 2.1 Check if both heaps are not empty
            this.smallNums.peek() !== null && this.largeNums.peek() !== null &&
            // 2.2 Compare roots
            this.smallNums.peek() > this.largeNums.peek()
        ) {
            // 2.3 Transfer
            this.largeNums.push(this.smallNums.pop());
        }

        // 3. Compare lengths (difference should not be more than 1)
        if(Math.abs(this.smallNums.length - this.largeNums.length) > 1) {
            // 3.1 Transfer
            if(this.smallNums.length > this.largeNums.length) {
                this.largeNums.push(this.smallNums.pop());
            } else {
                this.smallNums.push(this.largeNums.pop());
            }
        }
    }

    findMedian(): number {
        // Check if atleast one heap is not empty
        if(this.smallNums.peek() !== null || this.largeNums.peek() !== null) {
            // Median is in the smallNums
            if(this.smallNums.length > this.largeNums.length) {
                return this.smallNums.peek();
            }
            // Median is in the largeNums
            else if(this.largeNums.length > this.smallNums.length) {
                return this.largeNums.peek();
            }
            // In both
            else {
                return (this.smallNums.peek() + this.largeNums.peek()) / 2;
            }
        }
    }
}

class MaxHeap {
    private data: number[] = [];
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
        while(
            currIdx > 0 && 
            this.data[currIdx] > this.data[parentIdx] // Diff 1
            )  {
                const temp = this.data[currIdx];
                this.data[currIdx] = this.data[parentIdx];
                this.data[parentIdx] = temp;
                currIdx = parentIdx;
                parentIdx = Math.floor((currIdx -  1) / 2);
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
            // Diff 2
            const leftChildVal = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx];
            // Diff 3
            const rightChildVal = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx];
            // Diff 4
            const biggerChildIdx = leftChildVal > rightChildVal ? leftChildIdx : rightChildIdx;
            // Diff 5
            const biggerChildVal = leftChildVal > rightChildVal ? leftChildVal : rightChildVal;
            // Diff 6
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

class MinHeap {
    private data: number[] = [];
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
        while(
            currIdx > 0 && 
            this.data[currIdx] < this.data[parentIdx] // Diff 1
            )  {
                const temp = this.data[currIdx];
                this.data[currIdx] = this.data[parentIdx];
                this.data[parentIdx] = temp;
                currIdx = parentIdx;
                parentIdx = Math.floor((currIdx -  1) / 2);
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
            // Diff 2
            const leftChildVal = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx];
            // Diff 3
            const rightChildVal = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx];
            // Diff 4
            const smallerChildIdx = leftChildVal < rightChildVal ? leftChildIdx : rightChildIdx;
            // Diff 5
            const smallerChildVal = leftChildVal < rightChildVal ? leftChildVal : rightChildVal;
            // Diff 6
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

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */