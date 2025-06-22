class MaxHeap {
    values: number[];
    constructor() {
        this.values = [];
    }
    push(val: number):void {
        this.values.push(val);
        let current = this.size() - 1;
        while(current > 0) {
            const parentIndex = Math.floor((current - 1)/2);
            if(this.values[current] > this.values[parentIndex]) {
                this.swap(current, parentIndex);
                current = parentIndex;
            } else {
                break;
            }
        }
    }
    pop(): number | null {
        if(this.size() === 0) {
            return null;
        }
        if(this.size() === 1) {
            return this.values.pop();
        }
        const max = this.values[0];
        this.values[0] = this.values.pop();
        this.siftDown(0);
        return max;
    }
    heapify(nums: number[]):void {
        this.values = nums;
        let current = Math.floor((this.size() - 2)/2);
        while(current >= 0) {
            this.siftDown(current);
            current -= 1;
        }
    }
    siftDown(index: number):void {
        let current = index;
        while(current < this.size() - 1) {
            const leftChildIndex = 2 * current + 1;
            const rightChildIndex = 2 * current + 2;
            const leftChildValue = this.values[leftChildIndex] === undefined ? -Infinity : this.values[leftChildIndex];
            const rightChildValue = this.values[rightChildIndex] === undefined ? -Infinity : this.values[rightChildIndex];
            const largerChildIndex = leftChildValue > rightChildValue ? leftChildIndex : rightChildIndex;
            const largetChildValue = leftChildValue > rightChildValue ? leftChildValue : rightChildValue;
            if(this.values[current] < largetChildValue) {
                this.swap(current, largerChildIndex);
                current = largerChildIndex;
            } else {
                break;
            }
        }
    }
    swap(index1: number, index2: number):void {
        const temp = this.values[index1];
        this.values[index1] = this.values[index2];
        this.values[index2] = temp;
    }
    size():number {
        return this.values.length;
    }
}
function lastStoneWeight(stones: number[]): number {
    const maxHeap = new MaxHeap();
    maxHeap.heapify(stones);
    while(maxHeap.size() > 0) {
        if(maxHeap.size() > 1) {
            const x = maxHeap.pop();
            const y = maxHeap.pop();
            maxHeap.push(Math.abs(x - y));
        } else if(maxHeap.size() === 1) {
            return maxHeap.pop();
        } else {
            return 0;
        }
    }
};