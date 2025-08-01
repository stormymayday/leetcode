function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const uf = new UnionFind(n);
    for(let r = 0; r < n; r += 1) {
        for(let c = 0; c < n; c += 1) {
            if(isConnected[r][c] === 1) {
                uf.union(r, c);
            }
        }
    }
    return uf.getNumComponents();
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
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if(rootX === rootY) {
            return false;
        } else {
            if(this.sizes.get(rootX) > this.sizes.get(rootY)) {
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
    find(x: number):number {
        const parent = this.roots.get(x);
        if(parent !== x) {
            this.roots.set(x, this.find(parent));
        }
        return this.roots.get(x);
    }
    getNumComponents():number {
        return this.numComponents;
    }
}