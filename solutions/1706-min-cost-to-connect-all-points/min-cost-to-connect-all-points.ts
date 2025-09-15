function minCostConnectPoints(points: number[][]): number {

    // Edge Case: single point
    if(points.length === 1) {
        return 0;
    }

    const n = points.length;

    const edgeList: [number, number, number][] = [];
    for(let i = 0; i < n - 1; i += 1) {
        for(let j = i + 1; j < n; j += 1) {
            const src = i;
            const dst = j;
            const cost = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
            edgeList.push([src, dst, cost]);
        }
    }

    edgeList.sort((a, b) => a[2] - b[2]);

    const uf = new UnionFind(n);

    let mstCost = 0;
    let edgesUsed = 0;
    for(const [src, dst, cost] of edgeList) {
        if(uf.union(src, dst) === true) {
            mstCost += cost;
            edgesUsed += 1;
            if(edgesUsed === n - 1) {
                return mstCost;
            }
        }
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