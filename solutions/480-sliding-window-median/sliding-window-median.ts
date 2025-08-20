function medianSlidingWindow(nums: number[], k: number): number[] {

    const smallNums = new MaxHeap();
    const largeNums = new MinHeap();
    const markedForDeletion = new Map<number, number>(); // num -> number of occurances

    // process first k elements
    for (let i = 0; i < k; i += 1) {
        const num = nums[i];
        if (smallNums.length === largeNums.length) {
            // smallNums is allowed to have 1 more val
            largeNums.push(num); // rebalancing
            smallNums.push(largeNums.pop());
        } else {
            // smallNums already has 1 more
            smallNums.push(num); // rebalacing
            largeNums.push(smallNums.pop());
        }
    }

    // getting median of the first k elements
    const res: number[] = [];
    if(smallNums.length === largeNums.length) {
        res.push((smallNums.top() + largeNums.top()) / 2);
    } else {
        res.push(smallNums.top());
    }

    // Sliding window
    for(let i = k; i < nums.length; i += 1) {

        const outNum = nums[i - k];
        const inNum = nums[i];
        let balance = 0; // starting with neutral balance
        // negative balance - smallNums need more
        // positive balance - largeNums need more
        // neutral balance - smallNums === largeNums OR smallNums has atleast 1 more

        // Process the outNum
        markedForDeletion.set(outNum, (markedForDeletion.get(outNum) || 0) + 1);
        if(outNum <= smallNums.top()) {
            balance -= 1; // outNum is in the smallNums
        } else {
            balance += 1;
        }

        // Process the inNum
        if(inNum <= smallNums.top()) {
            smallNums.push(inNum);
            balance += 1; // goes into smallNums
        } else {
            largeNums.push(inNum);
            balance -= 1; // goes into largeNums
        }

        // Rebalancing
        if(balance < 0) {
            // transfer to smallNums
            smallNums.push(largeNums.pop());
            // balance += 1;
        }
        if(balance > 0) {
            // transfer to largeNums
            largeNums.push(smallNums.pop());
            // balance -= 1;
        }

        // Lazy Deletion
        while(markedForDeletion.has(smallNums.top())) {
            const num = smallNums.pop();
            markedForDeletion.set(num, markedForDeletion.get(num) - 1);
            if(markedForDeletion.get(num) === 0) {
                markedForDeletion.delete(num);
            }
        }
        while(markedForDeletion.has(largeNums.top())) {
            const num = largeNums.pop();
            markedForDeletion.set(num, markedForDeletion.get(num) - 1);
            if(markedForDeletion.get(num) === 0) {
                markedForDeletion.delete(num);
            }
        }

        // Get median
        if(k % 2 === 0) {
            res.push((smallNums.top() + largeNums.top()) / 2);
        } else {
            res.push(smallNums.top());
        }
    } 
    return res;
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
        let currIdx = this.data.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while (currIdx > 0 && this.data[currIdx] < this.data[parentIdx]) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): number | null {
        if (this.length === 0) {
            return null;
        }
        if (this.length === 1) {
            this.length -= 1;
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
        while (currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildVal = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx];
            const rightChildVal = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx];
            const smallerChildIdx = leftChildVal < rightChildVal ? leftChildIdx : rightChildIdx;
            const smallerChildVal = leftChildVal < rightChildVal ? leftChildVal : rightChildVal;
            if (this.data[currIdx] > smallerChildVal) {
                const temp = this.data[currIdx];
                this.data[currIdx] = smallerChildVal;
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
        while (currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top(): number | null {
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
        while (currIdx > 0 && this.data[currIdx] > this.data[parentIdx]) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): number | null {
        if (this.length === 0) {
            return null;
        }
        if (this.length === 1) {
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
        while (currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildVal = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx];
            const rightChildVal = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx];
            const biggerChildIdx = leftChildVal > rightChildVal ? leftChildIdx : rightChildIdx;
            const biggerChildVal = leftChildVal > rightChildVal ? leftChildVal : rightChildVal;
            if (this.data[currIdx] < biggerChildVal) {
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
        const n = nums.length;
        this.data = [...nums];
        this.length = n;
        let currIdx = Math.floor((n - 2) / 2);
        while (currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top(): number | null {
        return this.length > 0 ? this.data[0] : null;
    }
}