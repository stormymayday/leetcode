function medianSlidingWindow(nums: number[], k: number): number[] {
    const medians: number[] = [];
    const markedForRemoval = new Map<number, number>();
    const smallNums = new MaxHeap();
    const largeNums = new MinHeap();

    // 1. Initialzing the heaps with first k elements
    for(let i = 0; i < k; i += 1) {
        // If lengths are equal, push to small (allowing smallNums to have 1 more element)
        if(smallNums.length === largeNums.length) {
            // rebalance through largeNums
            largeNums.push(nums[i]);
            // push-pop to small
            smallNums.push(largeNums.pop());
        } 
        // smallNums already has 1 more element, push to large
        else {
            // rebalance through smallNums
            smallNums.push(nums[i]);
            // push-pop to large
            largeNums.push(smallNums.pop());
        }
    }

    // Calculate median of the first k elements
    if(k % 2 === 0) {
        medians.push((smallNums.top() + largeNums.top()) / 2);
    } else {
        medians.push(smallNums.top());
    }

    // Sliding Window
    for(let i = k; i < nums.length; i += 1) {

        const outNum = nums[i - k];
        const inNum = nums[i];
        // let balance = 0; // starting with neutral balance

        // mark the outNum and adjust balance
        if(!markedForRemoval.has(outNum)) {
            markedForRemoval.set(outNum, 0);
        }
        markedForRemoval.set(outNum, markedForRemoval.get(outNum) + 1);

        // outNum is in the smallNums
        // if(outNum <= smallNums.top()) {
        //     balance -= 1;
        // } 
        // // outNum is in the largeNums
        // else {
        //     balance += 1;
        // }
        let balance = outNum <= medians[medians.length - 1] ? -1 : 1;

        // process inNum and adjust balance
        if(inNum <= smallNums.top()) {
            smallNums.push(inNum);
            balance += 1;
        } else {
            largeNums.push(inNum);
            balance -= 1;
        }

        // rebalance
        // Not enough in the smallNums
        if(balance < 0) {
            // transfer to smallNums
            smallNums.push(largeNums.pop());
            balance += 1;
        }
        // Not enough in the largeNums
        if(balance > 0) {
            // transfer to largeNums
            largeNums.push(smallNums.pop());
            balance -= 1;
        }

        // Lazy Deletion
        while(markedForRemoval.has(smallNums.top())) {
            const num = smallNums.pop();
            markedForRemoval.set(num, markedForRemoval.get(num) - 1);
            if(markedForRemoval.get(num) === 0) {
                markedForRemoval.delete(num);
            }
        }
        while(markedForRemoval.has(largeNums.top())) {
            const num = largeNums.pop();
            markedForRemoval.set(num, markedForRemoval.get(num) - 1);
            if(markedForRemoval.get(num) === 0) {
                markedForRemoval.delete(num);
            }
        }

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