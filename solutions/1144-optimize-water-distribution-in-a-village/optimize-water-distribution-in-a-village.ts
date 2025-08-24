function minCostToSupplyWater(n: number, wells: number[], pipes: number[][]): number {
    // Add virtual node
    for(let i = 0; i < wells.length; i += 1) {
        pipes.push([0, i + 1, wells[i]]);
    }
    
    // Sort by weight
    pipes.sort((a, b) => a[2] - b[2]);

    const uf = new UnionFind(n + 1); // plus virtual node
    let mstCost = 0;
    let edgesUsed = 0;
    for(const [src, dst, weight] of pipes) {
        if(uf.union(src, dst) === true) {
            mstCost += weight;
            edgesUsed += 1;
            if(edgesUsed === n) { // plus virtual node
                return mstCost;
            }
        }
    }

    return -1;
};

class UnionFind {
    roots: Map<number, number>;
    sizes: Map<number, number>;
    numComponents: number;
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
    isSameComponent(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
    getNumComponents(): number {
        return this.numComponents;
    }
}