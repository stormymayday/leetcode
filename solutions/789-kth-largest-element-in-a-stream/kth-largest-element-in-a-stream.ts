class MinHeap {

    array: number[];

    constructor() {
        this.array = [];
    }

    push(val: number):void {
        this.array.push(val);
        let current = this.array.length - 1;
        while(current > 0) {
            const parentIndex = Math.floor((current - 1)/2);
            if(this.array[current] < this.array[parentIndex]) {
                this.swap(current, parentIndex);
                current = parentIndex;
            } else {
                break;
            }
        }
    }

    pop(): number | null {
        if(this.array.length === 0) {
            return null;
        }
        if(this.array.length === 1) {
            return this.array.pop();
        }
        const min = this.array[0];
        this.array[0] = this.array.pop();
        this.siftDown(0);
        return min;
    }
    
    heapify(nums: number []):void {
        this.array = nums;
        let current = this.array.length - 1;
        while(current >= 0) {
            this.siftDown(current);
            current -= 1;
        }
    }

    siftDown(index: number): void {
        let current = index;
        while(current < this.array.length - 1) {
            const leftChildIndex = 2 * current + 1;
            const rightChildIndex = 2 * current + 2;
            const leftChildValue = this.array[leftChildIndex] === undefined ? Infinity : this.array[leftChildIndex];
            const rightChildValue = this.array[rightChildIndex] === undefined ? Infinity : this.array[rightChildIndex];
            const smallerChildIndex = leftChildValue < rightChildValue ? leftChildIndex : rightChildIndex;
            const smallerChildValue = leftChildValue < rightChildValue ? leftChildValue : rightChildValue;
            if(this.array[current] > smallerChildValue) {
                this.swap(current, smallerChildIndex);
                current = smallerChildIndex;
            } else {
                break;
            }
        }
    }

    swap(index1: number, index2: number):void {
        const temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp;
    }

    size():number {
        return this.array.length;
    }

}

class KthLargest {

    minHeap: MinHeap;
    k: number;

    constructor(k: number, nums: number[]) {
        this.minHeap = new MinHeap;
        this.k = k;
        this.minHeap.heapify(nums);
        while(this.minHeap.size() > this.k) {
            this.minHeap.pop();
        }
    }

    add(val: number): number {
        this.minHeap.push(val);
        if(this.minHeap.size() > this.k) {
            this.minHeap.pop();
        }
        return this.minHeap.array[0];
    }
}