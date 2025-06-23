class MinHeap {
    values: number[];
    constructor() {
        this.values = [];
    }
    push(val: number):void {
        this.values.push(val);
        let current = this.values.length - 1;
        while(current > 0) {
            const parentIndex = Math.floor((current - 1)/2);
            if(this.values[current] < this.values[parentIndex]) {
                this.swap(current, parentIndex);
                current = parentIndex;
            } else {
                break;
            }
        }
    }
    pop(): number | undefined {
        if(this.values.length === 0) {
            return undefined;
        }
        if(this.values.length === 1) {
            return this.values.pop();
        }
        const min = this.values[0];
        this.values[0] = this.values.pop();
        this.siftDown(0);
        return min;
    }
    heapify(nums: number[]):void {
        this.values = nums;
        let current = Math.floor((this.values.length - 2)/2);
        while(current >= 0) {
            this.siftDown(current);
            current -= 1;
        }
    }
    siftDown(index: number):void {
        let current = index;
        while(current < this.values.length - 1) {
            const leftChildIndex = 2 * current + 1;
            const rightChildIndex = 2 * current + 2;
            const leftChildValue = this.values[leftChildIndex] === undefined ? Infinity : this.values[leftChildIndex];
            const rightChildValue = this.values[rightChildIndex] === undefined ? Infinity : this.values[rightChildIndex];
            const smallerChildIndex = leftChildValue < rightChildValue ? leftChildIndex : rightChildIndex;
            const smallerChildValue = leftChildValue < rightChildValue ? leftChildValue : rightChildValue;
            if(this.values[current] > smallerChildValue) {
                this.swap(current, smallerChildIndex);
                current = smallerChildIndex;
            } else {
                break;
            }
        }
    }
    swap(index1:number, index2: number):void {
        const temp = this.values[index1];
        this.values[index1] = this.values[index2];
        this.values[index2] = temp;
    }
    size():number {
        return this.values.length;
    }
    peak():number | undefined {
        return this.values[0];
    }
}
function findKthLargest(nums: number[], k: number): number {
    const minHeap = new MinHeap();
    for(let i = 0; i < nums.length; i += 1) { // O(n * log(k))
        minHeap.push(nums[i]);
        if(minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.peak(); // O(1)
};