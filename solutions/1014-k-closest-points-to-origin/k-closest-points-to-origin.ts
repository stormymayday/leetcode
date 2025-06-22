class Node {
    point: number[];
    distance: number;
    constructor(point: number[]) {
        this.point = point;
        this.distance = (point[0]*point[0]) + (point[1]*point[1]);
    }
}
class CustomPriorityQueue {
    points: Node[];
    constructor() {
        this.points = [];
    }
    push(point: Node):void {
        this.points.push(point);
        let current = this.points.length - 1;
        while(current > 0) {
            const parentIndex = Math.floor((current - 1)/2);
            if(this.points[current].distance < this.points[parentIndex].distance) {
                this.swap(current, parentIndex);
                current = parentIndex;
            } else {
                break;
            }
        }
    }
    pop():Node | null {
        if(this.points.length === 0) {
            return null;
        }
        if(this.points.length === 1) {
            return this.points.pop();
        }
        const min = this.points[0];
        this.points[0] = this.points.pop();
        this.siftDown(0);
        return min;
    }
    heapify(nodes: Node[]):void {
        this.points = nodes;
        let current = this.points.length - 1;
        while(current >= 0) {
            this.siftDown(current);
            current -= 1;
        }
    }
    siftDown(index: number):void {
        let current = index;
        while(current < this.points.length - 1) {
            const leftChildIndex = 2 * current + 1;
            const rightChildIndex = 2 * current + 2;
            const leftChildValue = this.points[leftChildIndex] === undefined ? Infinity : this.points[leftChildIndex].distance;
            const rightChildValue = this.points[rightChildIndex] === undefined ? Infinity : this.points[rightChildIndex].distance;
            const smallerChildIndex = leftChildValue < rightChildValue ? leftChildIndex : rightChildIndex;
            const smallerChildValue = leftChildValue < rightChildValue ? leftChildValue : rightChildValue;
            if(this.points[current].distance > smallerChildValue) {
                this.swap(current, smallerChildIndex);
                current = smallerChildIndex;
            } else {
                break;
            }
        }
    }
    swap(index1: number, index2: number):void {
        const temp = this.points[index1];
        this.points[index1] = this.points[index2];
        this.points[index2] = temp;
    }
    size():number {
        return this.points.length;
    }
}

function kClosest(points: number[][], k: number): number[][] {
    const pq = new CustomPriorityQueue();
    const nodes: Node[] = [];
    for(let i = 0; i < points.length; i += 1) {
        const newNode = new Node(points[i]);
        nodes.push(newNode);
    }
    pq.heapify(nodes);
    const result = [];
    let i = k;
    while(i !== 0 && pq.size() !== 0) {
        const node = pq.pop();
        result.push(node.point);
        i -= 1;
    }
    return result;
};