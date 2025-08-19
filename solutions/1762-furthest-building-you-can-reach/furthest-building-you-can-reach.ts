function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    const minHeap = new MinHeap();

    for(let i = 0; i < heights.length - 1; i += 1) {

        const currHeight = heights[i];
        const nextHeight = heights[i + 1];

        // It's a jump
        if(currHeight >= nextHeight) {
            continue;
        } 
        // it's a climb
        else {

            const climbDistance = nextHeight - currHeight;

            // Try ladders first
            if(ladders > 0) {
                ladders -= 1;
                minHeap.push(climbDistance);
            } 
            // no ladders left 
            else {
                // Try to reclaim a ladder if beneficial and heap is not empty
                if(minHeap.top() !== null && climbDistance > minHeap.top() && bricks >= minHeap.top()) {
                    const lastLadder = minHeap.pop();
                    // ladders += 1; // unnecessary
                    // replace pervious ladder with bricks
                    bricks -= lastLadder;
                    // use ladder on currentClimb
                    minHeap.push(climbDistance);
                    // ladders -= 1; // unnecessary
                } 
                // try bricks
                else {
                    if(bricks >= climbDistance) {
                        bricks -= climbDistance;
                    }
                    // not enough bricks
                    else {
                        return i; // early exit
                    }
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
    push(val: number):void {
        this.data.push(val);
        this.length += 1;
        let currIdx = this.data.length - 1;
        let parentIdx = Math.floor((currIdx - 1)/2);
        while(currIdx > 0 && this.data[currIdx] < this.data[parentIdx]) {
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
        const root = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return root;
    }
    siftDown(idx:number):void {
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
                this.data[currIdx] = smallerChildVal;
                this.data[smallerChildIdx] = temp;
                currIdx = smallerChildIdx;
            } else {
                break;
            }
        }
    }
    heapify(nums: number[]):void {
        this.data = [...nums];
        this.length = nums.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top():number | null {
        return this.length > 0 ? this.data[0] : null;
    }
}