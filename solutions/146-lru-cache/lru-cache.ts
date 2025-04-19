class Node {
    value: number;
    next: Node | null;
    prev: Node | null;
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {

    head: Node | null;
    tail: Node | null;
    length: number;
    capacity: number;
    lookup: Map<number, Node>;
    reverseLookup: Map<Node, number>;

    constructor(capacity: number) {
        this.head = this.tail = null;
        this.length = 0;
        this.capacity = capacity;
        this.lookup = new Map<number, Node>();
        this.reverseLookup = new Map<Node, number>();
    }

    get(key: number): number {
        // 1. check the cache for existence
        const node = this.lookup.get(key);
        if (!node) {
            // doesn't exist
            return -1;
        }
        // 2. Move the node to the front of the list
        this.detach(node);
        this.prepend(node);

        // 3. return the value found
        return node.value;
    }

    put(key: number, value: number): void {
        // Does it exist?
        let node = this.lookup.get(key);
        // If it doesn't
        if (!node) {
            // we need to insert
            node = new Node(value);
            this.length++;
            this.prepend(node);

            // check capacity and evict if over
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        }
        // If it does
        else {
            // move it to the front of the list
            this.detach(node);
            this.prepend(node);
            // update to the value
            node.value = value;
        }
    }

    detach(node: Node): void {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        // Edge Cases: Head & Tail
        if (this.head === node) {
            this.head = this.head.next;
        }
        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = null;
        node.prev = null;
    }

    prepend(node: Node): void {
        // If the list is empty
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        // Connect node to current head
        node.next = this.head;
        this.head.prev = node;
        // Update head pointer
        this.head = node;
    }

    trimCache(): void {
        // If we're under capacity, do nothing
        if (this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node;

        this.detach(this.tail as Node);

        const key = this.reverseLookup.get(tail);

        this.lookup.delete(key);

        this.reverseLookup.delete(tail);

        this.length--;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */