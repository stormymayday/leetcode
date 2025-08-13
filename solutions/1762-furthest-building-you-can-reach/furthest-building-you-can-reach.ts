function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    let bricksRemaining = bricks;
    let laddersRemaining = ladders;
    const minHeap = new MinHeap();
    for(let i = 0; i < heights.length - 1; i += 1) {

        const curr = heights[i];
        const next = heights[i + 1];

        // Jump
        if(next - curr <= 0) {
            continue;
        }
        // Climb
        else {
            const climbDistance = next - curr;
            // Try Ladders first
            if(laddersRemaining > 0) {
                laddersRemaining -= 1;
                minHeap.push(climbDistance);
            } 
            // Try bricks / reclaiming the ladder
            else {
                
                // try ladder reclamation if it's beneficial AND affordable
                if(minHeap.peek() !== null && climbDistance > minHeap.peek() && bricksRemaining >= minHeap.peek()) {
                    // retroactively replace ladder with bricks
                    bricksRemaining -= minHeap.peek();

                    minHeap.pop(); // take the ladder out
                    laddersRemaining += 1;
                
                    // use ladder for current height
                    minHeap.push(climbDistance);
                    laddersRemaining -= 1;
                } 
                // try using bricks directly
                else if(bricksRemaining >= climbDistance) {
                    bricksRemaining -= climbDistance;
                }  
                // If both options fail
                else {
                    return i;
                }
            }
        }

    }
    return heights.length - 1;
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
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
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