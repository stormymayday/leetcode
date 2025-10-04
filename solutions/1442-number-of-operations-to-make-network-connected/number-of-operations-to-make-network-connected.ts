function makeConnected(n: number, connections: number[][]): number {

    // Edge Case: not enough cables to begin with
    // Note: should be at least n-1 cables
    if(connections.length < n -1) {
        return -1;
    }

    const uf = new UnionFind(n);

    // Process all connections
    for(const [src, dst] of connections) {
        uf.union(src, dst);
    }

    // Check number of components, we need n - 1 cables to connect all components
    return uf.getNumComponents() - 1;

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
    getNumComponents() {
        return this.numComponents;
    }
}