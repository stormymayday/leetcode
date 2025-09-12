function makeConnected(n: number, connections: number[][]): number {

    // Edge Case: number of computers (n) is greater than number of cables (connections)
    // There should be atleast n - 1 number of cables / connections
    if(connections.length < n -1) {
        return -1
    }
    
    const uf = new UnionFind(n);

    let cablesUsed = 0;
    // 1. Iterate over the connections and perform 'union'
    for(const [src, dst] of connections) {
        // 1.1. If union is succssful, increment number of cables used
        if(uf.union(src, dst) === true) {
            cablesUsed += 1;
        }

    }

    // 2. Check if number of remaining cables (connections.length - cablesUsed) is is greater than or equals to number of components - 1
    const cablesRemaining = connections.length - cablesUsed;
    const componentsLeftToConnect = uf.getNumComponents() - 1;
    if(cablesRemaining >= componentsLeftToConnect) {
        return componentsLeftToConnect;
    } else {
        return -1;
    }

};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    private numComponents: number;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
        this.numComponents = n;
        for(let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
            this.sizes.set(i, 1);
        }
    }
    find(x: number): number {
        const root = this.roots.get(x);
        if(root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if(rootX === rootY) {
            return false;
        } else {
            if(this.sizes.get(rootX) >= this.sizes.get(rootY)) {
                this.roots.set(rootY, rootX);
                this.sizes.set(rootX, this.sizes.get(rootX) + this.sizes.get(rootY));
            } else {
                this.roots.set(rootX, rootY);
                this.sizes.set(rootY, this.sizes.get(rootY) + this.sizes.get(rootX));
            }
            this.numComponents -= 1;
            return true;
        }
    }
    getNumComponents(): number {
        return this.numComponents;
    }
}