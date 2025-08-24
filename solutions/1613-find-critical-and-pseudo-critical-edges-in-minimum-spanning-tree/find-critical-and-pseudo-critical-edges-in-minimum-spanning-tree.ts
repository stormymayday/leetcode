function findCriticalAndPseudoCriticalEdges(n: number, edges: number[][]): number[][] {

    // 1. Add index
    for(let i = 0; i < edges.length; i += 1) {
        edges[i].push(i);
    }

    // 2. Sort by weight
    edges.sort((a, b) => a[2] - b[2]); 

    // 3. Calculate mstCost
    const uf = new UnionFind(n);
    let mstCost = 0;
    let edgesUsed = 0;
    for(const [a, b, weight] of edges) {
        if(uf.union(a, b) === true) {
            mstCost += weight;
            edgesUsed += 1;
            if(edgesUsed === n - 1) {
                break;
            }
        }
    }

    // 4. Brute Force
    const crit: number[] = [];
    const pseu: number[] = [];
    for(const [currA, currB, currWeight, currIdx] of edges) {
        // 4.1. Skip current edge
        const ufSkip = new UnionFind(n);
        let skipCost = 0;
        let skipEdgesUsed = 0;
        for(const [aS, bS, weightS, idxS] of edges) {
            if(idxS !== currIdx && ufSkip.union(aS, bS) === true) {
                skipCost += weightS;
                skipEdgesUsed += 1;
                if(skipEdgesUsed === n - 1) {
                    break;
                }
            }
        }
        if(skipEdgesUsed !== n - 1 || skipCost > mstCost) {
            crit.push(currIdx);
            continue; // skip the pseudo-critical check for edges that are already identified as critical
        }

        // 4.2. Force current edge
        const ufForce = new UnionFind(n);
        ufForce.union(currA, currB);
        let forceCost = currWeight;
        let forceEdgesUsed = 1;
        for(const [aF, bF, weightF, idxF] of edges) {
            if(ufForce.union(aF, bF) === true) {
                forceCost += weightF;
                forceEdgesUsed += 1;
                if(forceEdgesUsed === n - 1) {
                    break;
                }
            }
        }
        if(forceCost === mstCost) {
            pseu.push(currIdx);
        }
    }
    return [crit, pseu];
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
        if(rootX == rootY) {
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