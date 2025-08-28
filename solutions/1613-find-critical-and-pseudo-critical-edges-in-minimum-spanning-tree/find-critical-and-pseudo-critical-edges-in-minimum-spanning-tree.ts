function findCriticalAndPseudoCriticalEdges(n: number, edges: number[][]): number[][] {

    // 1. Add original index
    for(let i = 0; i < edges.length; i += 1) {
        edges[i].push(i);
    }

    // 2. Sort by weight
    edges.sort((a, b) => a[2] - b[2]);

    // 3. Calculate mstCost using Kruskal's
    const uf = new UnionFind(n);
    let mstCost = 0;
    let edgesUsed = 0;
    for(const [src, dst, cost] of edges) {
        if(uf.union(src, dst) === true) {
            mstCost += cost;
            edgesUsed += 1;
            if(edgesUsed === n - 1) {
                break;
            }
        }
    }

    // 4. Find Critical and Pseudo-Critical Edges
    const critical: number[] = [];
    const pseudo: number[] = [];
    for(const [src, dst, cost, currIdx] of edges) {
        // Skip Current Edge
        const ufSkip = new UnionFind(n);
        let mstSkipCost = 0;
        let skipEdgesUsed = 0;
        for(const [srcX, dstX, costX, idxX] of edges) {
            if(idxX !== currIdx && ufSkip.union(srcX, dstX) == true) {
                mstSkipCost += costX;
                skipEdgesUsed += 1;
                if(skipEdgesUsed === n - 1) {
                    break;
                }
            }
        }
        if(skipEdgesUsed !== n - 1 || mstSkipCost > mstCost) {
            critical.push(currIdx);
            continue;
        }

        // Force Current Edge
        const ufForce = new UnionFind(n);
        ufForce.union(src, dst);
        let mstForceCost = cost;
        let forceEdgesUsed = 1;
        for(const [srcF, dstF, costF, idxF] of edges) {
            if(ufForce.union(srcF, dstF) == true) {
                mstForceCost += costF;
                forceEdgesUsed += 1;
                if(forceEdgesUsed === n - 1) {
                    break;
                }
            }
        }
        if(mstForceCost === mstCost) {
            pseudo.push(currIdx);
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