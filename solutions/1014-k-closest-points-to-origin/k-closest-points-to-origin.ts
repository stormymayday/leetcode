class Node {
    point: number[];
    distance: number;
    constructor(point) {
        this.point = point;
        this.distance = Math.sqrt(point[0]**2 + point[1]**2);
    }
}
class CustomPriorityQueue {
    points: Node[];
    constructor() {
        this.points = [];
    }
    push(pointNode: Node):void {
        this.points.push(pointNode);
        let current = this.points.length - 1;
        // sift up
        while(current > 0) {
            const parentIndex = Math.floor((current - 1)/2);
            if(this.points[current].distance > this.points[parentIndex].distance) {
                this.swap(current, parentIndex);
                current = parentIndex;
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
        const max = this.points[0];
        this.points[0] = this.points.pop();
        this.siftDown(0);
        return max;
    }
    heapify(nodes: Node[]):void {
        this.points = nodes;
        let current = Math.floor((this.points.length - 2) / 2);
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
            const leftChildValue = this.points[leftChildIndex] === undefined ? -Infinity : this.points[leftChildIndex].distance;
            const rightChildValue = this.points[rightChildIndex] === undefined ? -Infinity : this.points[rightChildIndex].distance;
            const largerChildIndex = leftChildValue > rightChildValue ? leftChildIndex : rightChildIndex;
            const largerChildValue = leftChildValue > rightChildValue ? leftChildValue : rightChildValue;
            if(this.points[current].distance < largerChildValue) {
                this.swap(current, largerChildIndex);
                current = largerChildIndex;
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
    // Optimization
    if(points.length < k) {
        return points;
    }

    const pq = new CustomPriorityQueue();
    const nodes = [];
    for(let i = 0; i < points.length; i += 1) {
        const newNode = new Node(points[i]);
        nodes.push(newNode);
    }
    pq.heapify(nodes);
    while(pq.size() > k) {
        pq.pop();
    }
    const result = [];
    while(pq.size() > 0) {
        const pointNode = pq.pop();
        result.push(pointNode.point);
    }
    return result;
};