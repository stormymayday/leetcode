class CustomListNode {
    val: number;
    next: CustomListNode | null;
    constructor(val: number) {
        this.val = val;
        this.next = null;
    }
}

class MyHashSet {

    data: CustomListNode[];
    capacity: number = 101;

    constructor() {
        // filling with dummy heads
        this.data = new Array(this.capacity);
        for(let i = 0; i < this.capacity; i += 1) {
            this.data[i] = new CustomListNode(-Infinity);
        }
    }

    add(key: number): void {

        const newNode = new CustomListNode(key);

        let prev = this.data[key % this.capacity];
        let temp = this.data[key % this.capacity].next;

        while(temp !== null) {

            if(temp.val === key) {
                return;
            } else {
                prev = temp;
                temp = temp.next;
            }

        }
        
        prev.next = newNode;
        return;

    }

    remove(key: number): void {

        let prev = this.data[key % this.capacity];
        let temp = this.data[key % this.capacity].next;

        while(temp !== null) {

            if(temp.val === key) {
                prev.next = temp.next;
                temp.next = null;
                return;
            } else {
                prev = temp;
                temp = temp.next;
            }
            
        }

    }

    contains(key: number): boolean {

        // starting at the dummyNode.next
        let temp = this.data[key % this.capacity].next;

        while(temp !== null) {
            
            if(temp.val === key) {
                return true;
            } else {
                temp = temp.next;
            }

        }

        return false;

    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */