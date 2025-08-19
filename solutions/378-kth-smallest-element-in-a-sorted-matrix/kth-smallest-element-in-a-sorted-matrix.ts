function kthSmallest(matrix: number[][], k: number): number {

    const maxHeap = new MaxHeap();

    for(let row = 0; row < matrix.length; row += 1) {
        for(let col = 0; col < matrix[0].length; col += 1) {
            const val = matrix[row][col];
            if(maxHeap.length < k) {
                maxHeap.push(val);
            } else {
                if(val < maxHeap.top()) {
                    maxHeap.pop();
                    maxHeap.push(val);
                }
            }
        }
    }

    return maxHeap.top();
    
};

class MaxHeap {
    private data: number[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val:number):void {
        this.data.push(val);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1)/2);
        while(currIdx > 0 && this.data[currIdx] > this.data[parentIdx]) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1)/2);
        }
    }
    pop():number | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
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
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildVal = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx];
            const rightChildVal = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx];
            const biggerChildIdx = leftChildVal > rightChildVal ? leftChildIdx : rightChildIdx;
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
    heapify(nums: number[]):void {
        const n = nums.length;
        this.data = [...nums];
        this.length = n;
        let currIdx = Math.floor((n - 2)/2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top():number | null {
        return this.length > 0 ? this.data[0] : null;
    }
}