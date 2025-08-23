function minCostToSupplyWater(n: number, wells: number[], pipes: number[][]): number {

    // Create a copy of pipes to avoid mutating the original array
    const edges = [...pipes];

    // Add virtual vertex 0 and its edges (well costs)
    for(let i = 0; i < wells.length; i += 1) {
        const src = 0;
        const dst = i + 1;
        const weight = wells[i];
        edges.push([src, dst, weight]);
    }

    // Sort edges by cost
    edges.sort((a, b) => a[2] - b[2]);

    const uf = new UnionFind(n);
    let edgesUsed = 0;
    let mstCost = 0;

    for(const edge of edges) {
        const [src, dst, weight] = edge;
        if(uf.union(src, dst) === true) {
            mstCost += weight;
            edgesUsed += 1;
            if(edgesUsed === n) { // Need n edges to connect (including virtual)
                return mstCost;
            }
        }
    }

    return -1; // Should not happen with valid input
};

class UnionFind {
    roots: Map<number, number>;
    sizes: Map<number, number>;
    numComponents: number;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
        this.numComponents = n;
        for(let i = 0; i <= n; i += 1) {
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