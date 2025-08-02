class UnionFind {
    private roots: Map<number, number>;
    private heights: Map<number, number>;
    private numComponents: number;
    constructor(n: number) {
        this.roots = new Map();
        this.heights = new Map();
        this.numComponents = n;
        for(let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
            this.heights.set(i, 1);
        }
    }
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if(rootX === rootY) {
            return false;
        } else {
            if(this.heights.get(rootX) > this.heights.get(rootY)) {
                this.roots.set(rootY, rootX);
            } else if(this.heights.get(rootY) > this.heights.get(rootX)) {
                this.roots.set(rootX, rootY);
            } else {
                this.roots.set(rootX, rootY);
                this.heights.set(rootY, this.heights.get(rootY) + 1);
            }
            this.numComponents -= 1;
            return true;
        }
    }
    find(x: number): number {
        const parent = this.roots.get(x);
        if(parent !== x) {
            this.roots.set(x, this.find(parent));
        }
        return this.roots.get(x);
    }
}
function validTree(n: number, edges: number[][]): boolean {
    if(n - 1 !== edges.length) {
        return false;
    }
    const uf = new UnionFind(n);
    for(const edge of edges) {
        const [a, b] = edge;
        if(uf.union(a, b) === false) {
            return false;
        }
    }
    return true;
};