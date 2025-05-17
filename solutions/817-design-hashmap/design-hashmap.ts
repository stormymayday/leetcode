/**
 * Node for MyHashMap - Separate Chaining
 */
class Node {
    key: number;
    value: number;
    next: Node | null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

/**
 * MyHashMap with Separate Chaining
 */
class MyHashMap {

    private capacity: number;
    private size: number;
    private table: Array<Node | null>;

    constructor(capacity: number = 1000) {
        this.capacity = capacity;
        this.size = 0;
        this.table = new Array<Node | null>(this.capacity).fill(null);
    }

    /**
     * Hash function using modulo
     */
    private hashFunction(key: number): number {
        return key % this.capacity;
    }

    put(key: number, value: number): void {
        const index = this.hashFunction(key);
        let node = this.table[index];

        if (!node) {
            this.table[index] = new Node(key, value);
            this.size++;
        } else {
            let prev: Node | null = null;
            while (node) {
                if (node.key === key) {
                    node.value = value;
                    return;
                }
                prev = node;
                node = node.next;
            }
            prev!.next = new Node(key, value);
            this.size++;
        }
    }

    get(key: number): number {
        const index = this.hashFunction(key);
        let node = this.table[index];

        while (node) {
            if (node.key === key) {
                return node.value;
            }
            node = node.next;
        }

        return -1;
    }

    remove(key: number): void {
        const index = this.hashFunction(key);
        let node = this.table[index];
        let prev: Node | null = null;

        while (node) {
            if (node.key === key) {
                if (prev) {
                    prev.next = node.next;
                } else {
                    this.table[index] = node.next;
                }
                this.size--;
            }
            prev = node;
            node = node.next;
        }
    }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */