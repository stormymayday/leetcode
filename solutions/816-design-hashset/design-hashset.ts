class MyHashSet {

    capacity: number;
    data: boolean[];

    constructor() {
        this.capacity = 1000001;
        this.data = new Array(this.capacity).fill(false);
    }

    add(key: number): void {
        this.data[key % this.capacity] = true;
    }

    remove(key: number): void {
        this.data[key % this.capacity] = false;
    }

    contains(key: number): boolean {
        return this.data[key % this.capacity];
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */