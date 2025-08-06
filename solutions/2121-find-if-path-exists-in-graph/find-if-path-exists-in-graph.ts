function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const uf = new UnionFind(n);
    for(const edge of edges) {
        const [src, dst] = edge;
        uf.union(src, dst);
    }
    return uf.isSameComponent(source, destination);
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
            return true;
        }
    }
    isSameComponent(x: number, y: number):boolean {
        return this.find(x) === this.find(y);
    }
}