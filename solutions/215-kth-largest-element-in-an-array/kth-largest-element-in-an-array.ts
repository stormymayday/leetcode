class MinHeap {
    data: number [];
    constructor() {
        this.data = [];
    }
    insert(val: number): void {
        this.data.push(val);
        let current = this.data.length - 1;
        // Sift Up
        while(current > 0) {
            let parentIdx = Math.floor((current - 1) / 2);
            if(this.data[current] < this.data[parentIdx]) {
                // swap
                const temp = this.data[current];
                this.data[current] = this.data[parentIdx];
                this.data[parentIdx] = temp;
                // move current index
                current = parentIdx;
            } else {
                break;
            }
        }
    }
    delete(): number | null {
        // Edge Case: Empty array
        if(this.data.length === 0) {
            return null;
        }

        // Single element
        if(this.data.length === 1) {
            return this.data.pop();
        }

        // Two or more elements
        // 1. Save root value
        const min = this.data[0];
        // 2. Move last value to the top
        this.data[0] = this.data.pop();
        // 3. Sift Down
        let current = 0;
        while(current < this.data.length) {
            const leftChildIdx = 2 * current + 1;
            const rightChildIdx = 2 * current + 2;
            const leftChildVal = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx];
            const rightChildVal = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx];
            const smallerChildVal = leftChildVal < rightChildVal ? leftChildVal : rightChildVal;
            const smallerChildIdx = leftChildVal < rightChildVal ? leftChildIdx : rightChildIdx;
            if(this.data[current] > smallerChildVal) {
                // swap
                const temp = this.data[current];
                this.data[current] = this.data[smallerChildIdx];
                this.data[smallerChildIdx] = temp;
                // move current
                current = smallerChildIdx;
            } else {
                break;
            }
        }
        // 4. Return min
        return min;
    }
}

function findKthLargest(nums: number[], k: number): number {
    const minHeap = new MinHeap();
    for(let i = 0; i < nums.length; i += 1) {
        minHeap.insert(nums[i]);
        if(minHeap.data.length > k) {
            minHeap.delete();
        }
    }
    return minHeap.delete();
};