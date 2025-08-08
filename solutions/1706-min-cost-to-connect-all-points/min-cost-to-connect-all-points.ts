function minCostConnectPoints(points: number[][]): number {

    const n = points.length;

    const edges = [];
    for(let currNode = 0; currNode < n; currNode += 1) {
        for(let nextNode = currNode + 1; nextNode < n; nextNode += 1) {
            let weight = Math.abs(points[currNode][0] - points[nextNode][0]) +
                         Math.abs(points[currNode][1] - points[nextNode][1]);
            edges.push([currNode, nextNode, weight]);
        }
    }
    edges.sort((a, b) => a[2] - b[2]);

    const uf = new UnionFind(n);
    let mstCost = 0;
    let edgesUsed = 0;

    for(const edge of edges) {
        const [src, dst, weight] = edge;
        if(uf.union(src, dst) === true) {
            mstCost += weight;
            edgesUsed += 1;
            if(edgesUsed === n - 1) {
                break;
            }
        }
    }

    return mstCost;

};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
        for(let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
            this.sizes.set(i, 1);
        }
    }
    find(x: number):number {
        const root = this.roots.get(x);
        if(root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(x: number, y: number):boolean {
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
            return true;
        }
    }
}