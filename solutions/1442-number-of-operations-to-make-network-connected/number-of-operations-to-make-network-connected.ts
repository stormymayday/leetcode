function makeConnected(n: number, connections: number[][]): number {
    const uf = new UnionFind(n);

    let cablesUsed = 0;

    for(const cable of connections) {
        const [src, dst] = cable;
        if(uf.union(src, dst) === true) {
            cablesUsed += 1;
        }
    }

    const cablesLeft = connections.length - cablesUsed;
    // Note: The -1 is because to connect k separate components into one fully connected network
    // we need exactly k-1 edges (cables)
    const componentsToConnect = uf.getNumComponents() - 1;

    if(cablesLeft >= componentsToConnect) {
        return componentsToConnect;
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