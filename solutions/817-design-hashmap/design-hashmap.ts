class CustomListNode {
    val: number[];
    next: CustomListNode | null;
    constructor(key: number, val: number) {
        this.val = [key, val];
        this.next = null;
    }
}

class MyHashMap {

    capacity: number = 101;
    data: CustomListNode[];

    constructor() {
        this.data = new Array(this.capacity);
        for(let i = 0; i < this.capacity; i += 1) {
            this.data[i] = new CustomListNode(-Infinity, -Infinity);
        }
    }

    put(key: number, value: number): void {

        const newNode = new CustomListNode(key, value);
        let prev = this.data[key % this.capacity];
        let curr = this.data[key % this.capacity].next;

        while(curr !== null) {
            // key already exists
            if(curr.val[0] === key) {
                // overwriting an existing value
                curr.val[1] = value;
                return;
            } else {
                prev = curr;
                curr = curr.next;
            }

        }

        prev.next = newNode;
        return;

    }

    get(key: number): number {

        let curr = this.data[key % this.capacity].next;

        while(curr !== null) {

            if(curr.val[0] === key) {
                return curr.val[1];
            } else {
                curr = curr.next;
            }

        }

        return -1;

    }

    remove(key: number): void {

        let prev = this.data[key % this.capacity];
        let curr = this.data[key % this.capacity].next;

        while(curr !== null) {

            if(curr.val[0] === key) {
                prev.next = curr.next;
                curr.next = null;
                return;
            } else {
                prev = curr;
                curr = curr.next;
            }

        }

        return;

    }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */