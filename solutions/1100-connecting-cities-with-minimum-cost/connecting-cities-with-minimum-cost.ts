function minimumCost(n: number, connections: number[][]): number {
    
    // 1. Sort edge list by weight
    connections.sort((a, b) => {
        return a[2] - b[2];
    });

    // 2. Initialize Union Find
    const uf = new UnionFind(n);

    // 3. Perform Kruskal's
    let mstCost = 0;
    let edgesUsed = 0;
    for(const [src, dst, cost] of connections) {
        if(uf.union(src, dst) === true) {
            edgesUsed += 1;
            mstCost += cost;
            if(edgesUsed === n - 1) {
                return mstCost;
            }
        }
    } 
    // Impossible to connect all the cities
    return -1;

};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    private numComponents: number;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
        this.numComponents = n;
        for(let i = 1; i <= n; i += 1) {
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
    isSameComponent(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
    getNumComponents(): number {
        return this.numComponents;
    }
}