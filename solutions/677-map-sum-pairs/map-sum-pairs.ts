class MapSum {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(key: string, val: number): void {
        let curr: TrieNode = this.root;
        for(let i = 0; i < key.length; i += 1) {
            if(!curr.children.has(key[i])) {
                curr.children.set(key[i], new TrieNode());
            }
            curr = curr.children.get(key[i]);
        }
        curr.val = val;
    }

    sum(prefix: string): number {
        let curr: TrieNode = this.root;
        for(let i = 0; i < prefix.length; i += 1) {
            if(!curr.children.has(prefix[i])) {
                return 0;
            } else {
                curr = curr.children.get(prefix[i]);
            }
        }
        return this.dfs(curr);
    }

    dfs(node: TrieNode): number {
        if(node.children.size === 0) {
            return node.val;
        }
        let childrenSum = 0;
        for(const child of node.children.values()) {
            childrenSum += this.dfs(child);
        }
        return node.val + childrenSum;
    }

}

class TrieNode {
    children: Map<string, TrieNode>;
    val: number;
    constructor() {
        this.children = new Map();
        this.val = 0;
    }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */