function medianSlidingWindow(nums: number[], k: number): number[] {

    const smallNums = new MaxHeap();
    const largeNums = new MinHeap();
    const markedForDeletion = new Map<number, number>(); // key: num, val: count
    const medians: number[] = [];

    // 1. Find median of the first k elements
    for(let i = 0; i < k; i += 1) {

        const num = nums[i];

        if(smallNums.length === largeNums.length) {
            largeNums.push(num);
            smallNums.push(largeNums.pop());
        } else {
            smallNums.push(num);
            largeNums.push(smallNums.pop());
        }

    }
    if(smallNums.length === largeNums.length) {
        medians.push((smallNums.top() + largeNums.top()) / 2);
    } else {
        medians.push(smallNums.top());
    }

    // 2. Sliding Window
    for(let i = k; i < nums.length; i += 1) {

        const outNum = nums[i - k];
        const inNum = nums[i];
        let balance = 0;

        // Process the outNum
        if(outNum <= smallNums.top()) {
            balance -= 1;
        } else {
            balance += 1;
        }
        markedForDeletion.set(outNum, (markedForDeletion.get(outNum) || 0) + 1);

        // Process the inNum
        if(inNum <= smallNums.top()) {
            smallNums.push(inNum);
            balance += 1;
        } else {
            largeNums.push(inNum);
            balance -= 1;
        }

        // Rebalance
        if(balance < 0) {
            smallNums.push(largeNums.pop());
        }
        if(balance > 0) {
            largeNums.push(smallNums.pop());
        }

        // Lazy Deletion
        while(smallNums.length > 0 && markedForDeletion.has(smallNums.top())) {
            const num = smallNums.pop();
            markedForDeletion.set(num, markedForDeletion.get(num) - 1);
            if(markedForDeletion.get(num) === 0) {
                markedForDeletion.delete(num);
            }
        }
        while(largeNums.length > 0 && markedForDeletion.has(largeNums.top())) {
            const num = largeNums.pop();
            markedForDeletion.set(num, markedForDeletion.get(num) - 1);
            if(markedForDeletion.get(num) === 0) {
                markedForDeletion.delete(num);
            }
        }

        // Get Median
        if(k % 2 === 0) {
            medians.push((smallNums.top() + largeNums.top()) / 2);
        } else {
            medians.push(smallNums.top());
        }

    }

    return medians;
};

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
            this.swap(currIdx, parentIdx);
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
            const smallerChildIdx = leftChildVal < rightChildVal ? leftChildIdx : rightChildIdx;
            const smallerChildVal = leftChildVal < rightChildVal ? leftChildVal : rightChildVal;
            if(this.data[currIdx] > smallerChildVal) {
                this.swap(currIdx, smallerChildIdx); 
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
    top(): number | null {
        return this.length > 0 ? this.data[0] : null;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
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
            this.swap(currIdx, parentIdx);
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
            const largerChildIdx = leftChildVal > rightChildVal ? leftChildIdx : rightChildIdx;
            const largerChildVal = leftChildVal > rightChildVal ? leftChildVal : rightChildVal;
            if(this.data[currIdx] < largerChildVal) {
                this.swap(currIdx, largerChildIdx); 
                currIdx = largerChildIdx;
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
    top(): number | null {
        return this.length > 0 ? this.data[0] : null;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}