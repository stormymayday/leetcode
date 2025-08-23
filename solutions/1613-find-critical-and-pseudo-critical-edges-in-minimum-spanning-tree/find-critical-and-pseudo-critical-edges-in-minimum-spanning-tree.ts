function findCriticalAndPseudoCriticalEdges(n: number, edges: number[][]): number[][] {
    // Add original index
    for(let i = 0; i < edges.length; i += 1) {
        edges[i].push(i);
    }

    // Sort by weight
    edges.sort((a, b) => a[2] - b[2]);

    // Calculate mstCost
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

    // Brute Force: Check each edge for critical and pseudo-critical
    const critical: number[] = [];
    const pseudo: number[] = [];
    for(const edge of edges) {
        // Skip Current Edge
        const [currSrc, currDst, currWeight, currIndex] = edge;
        const ufWithout = new UnionFind(n);
        let weightWithout = 0;
        let edgesUsedX = 0;
        for(const edge of edges) {
            const [srcX, dstX, weightX, indexX] = edge;
            if(indexX !== currIndex && ufWithout.union(srcX, dstX) === true) {
                weightWithout += weightX;
                edgesUsedX += 1;
            }
        }
        if(edgesUsedX !== n - 1 || weightWithout > mstCost) {
            critical.push(currIndex);
            continue;
        }

        // Force Current Edge
        const ufWith = new UnionFind(n);
        ufWith.union(currSrc, currDst);
        let weightWith = currWeight;
        for(const edge of edges) {
            const [srcW, dstW, weightW, indexW] = edge;
            if(ufWith.union(srcW, dstW) === true) {
                weightWith += weightW;
            }
        }
        if(mstCost === weightWith) {
            pseudo.push(currIndex);
        }
    }

    return [critical, pseudo];
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