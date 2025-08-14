function medianSlidingWindow(nums: number[], k: number): number[] {
    const medians: number[] = [];
    const hashTable = new Map<number, number>(); // Lazy deletion: tracks count of elements to remove
    const smallNumbers = new MaxHeap(); // Max heap for smaller half  
    const largeNumbers = new MinHeap(); // Min heap for larger half 
    
    let i = 0; // Index of current element being processed
    
    // PHASE 1: Initialize the first window
    // Put all k elements into max heap first
    while (i < k) {
        smallNumbers.push(nums[i++]);
    }
    
    // Move half of them to min heap to establish the invariant
    // After this: smallNumbers has ceil(k/2) elements, largeNumbers has floor(k/2) elements
    for (let j = 0; j < Math.floor(k / 2); j++) {
        largeNumbers.push(smallNumbers.pop());
    }
    
    // PHASE 2: Process sliding windows
    while (true) {
        // Extract median from current window
        // Odd k: median is smallNumbers.top() (max heap has one extra element)
        // Even k: median is average of smallNumbers.top() and largeNumbers.top()
        medians.push(k & 1 ? smallNumbers.peek() : (smallNumbers.peek() * 0.5 + largeNumbers.peek() * 0.5));
        
        if (i >= nums.length) {
            break; // All elements processed
        }
        
        // SLIDING WINDOW OPERATION
        const outNum = nums[i - k]; // Element leaving the window
        const inNum = nums[i++]; // Element entering the window  
        let balance = 0; // Tracks heap size imbalance
        
        // STEP 1: Handle outgoing element (lazy deletion)
        // Determine which heap the outgoing element affects
        balance += (outNum <= smallNumbers.peek() ? -1 : 1);
        hashTable.set(outNum, (hashTable.get(outNum) || 0) + 1); // Mark for lazy deletion
        
        // STEP 2: Handle incoming element
        // Add to appropriate heap based on comparison with smallNumbers.top()
        if (smallNumbers.length !== 0 && inNum <= smallNumbers.peek()) {
            balance++; // smallNumbers gains an element
            smallNumbers.push(inNum);
        } else {
            balance--; // largeNumbers gains an element
            largeNumbers.push(inNum);
        }
        
        // STEP 3: Rebalance heaps if necessary
        // balance < 0: smallNumbers has too few valid elements
        if (balance < 0) {
            smallNumbers.push(largeNumbers.pop());
            balance++;
        }
        // balance > 0: largeNumbers has too few valid elements
        if (balance > 0) {
            largeNumbers.push(smallNumbers.pop());
            balance--;
        }
        
        // STEP 4: Clean up lazy-deleted elements from heap tops
        // Remove invalid elements from smallNumbers's top
        while (hashTable.get(smallNumbers.peek())) {
            const top = smallNumbers.peek();
            hashTable.set(top, hashTable.get(top)! - 1);
            if (hashTable.get(top) === 0) {
                hashTable.delete(top);
            }
            smallNumbers.pop();
        }
        
        // Remove invalid elements from largeNumbers's top  
        while (largeNumbers.length !== 0 && hashTable.get(largeNumbers.peek())) {
            const top = largeNumbers.peek();
            hashTable.set(top, hashTable.get(top)! - 1);
            if (hashTable.get(top) === 0) {
                hashTable.delete(top);
            }
            largeNumbers.pop();
        }
    }
    
    return medians;
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