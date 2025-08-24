function findCriticalAndPseudoCriticalEdges(n: number, edges: number[][]): number[][] {

    // 1. Add index
    for(let i = 0; i < edges.length; i += 1) {
        edges[i].push(i);
    }

    // 2. sort by weight
    edges.sort((a, b) => a[2] - b[2]);

    // 3. Calculate mstCost
    const uf = new UnionFind(n);
    let mstCost = 0;
    let edgesUsed = 0;
    for(const [src, dst, weight] of edges) {
        if(uf.union(src, dst) === true) {
            mstCost += weight;
            edgesUsed += 1;
            if(edgesUsed === n - 1) {
                break;
            }
        }
    }

    // 4. Find crit and pseduo edges
    const crit: number[] = [];
    const pseudo: number[] = [];
    for(const [currSrc, currDst, currWeight, currIdx] of edges) {
        // 4.1 Skip current edge (using idx)
        const ufSkip = new UnionFind(n);
        let skipCost = 0;
        let skipEdgesUsed = 0;
        for(const [srcX, dstX, weightX, idxX] of edges) {
            if(idxX !== currIdx && ufSkip.union(srcX, dstX) === true) {
                skipCost += weightX;
                skipEdgesUsed += 1;
                if(skipEdgesUsed === n - 1) {
                    break;
                }
            }
        }
        if(skipEdgesUsed !== n - 1 || skipCost > mstCost) {
            crit.push(currIdx);
            continue;
        }

        // 4.2 Force current edge
        const ufForce = new UnionFind(n);
        ufForce.union(currSrc, currDst);
        let forceCost = currWeight;
        let forceEdgesUsed = 1;
        for(const [srcY, dstY, weightY] of edges) {
            if(ufForce.union(srcY, dstY) === true) {
                forceCost += weightY;
                forceEdgesUsed += 1;
                if(forceEdgesUsed === n - 1) {
                    break;
                }
            }
        }
        if(forceCost === mstCost) {
            pseudo.push(currIdx);
        }
    }

    return [crit, pseudo];

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
                this.sizes.set(rootY, this.sizes.get(rootY) + this.sizes.get(rootY));
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