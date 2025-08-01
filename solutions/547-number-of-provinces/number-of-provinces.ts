function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const uf = new UnionFind(n);
    for(let r = 0; r < n; r += 1) {
        for(let c = 0; c < n; c += 1) {
            if(isConnected[r][c] === 1) {
                uf.union(r,c);
            }
        }
    }
    return uf.getNumComponents();
};

class UnionFind {
    private roots: number[];
    private heights: number[];
    private numComponents: number;
    constructor(n: number) {
        this.roots = [];
        this.heights = [];
        this.numComponents = n;
        for(let i = 0; i < n; i += 1) {
            this.roots.push(i);
            this.heights.push(1);
        }
    }
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if(rootX === rootY) {
            return false;
        } else {
            if(this.heights[rootX] > this.heights[rootY]) {
                this.roots[rootY] = rootX;
            } else if(this.heights[rootY] > this.heights[rootX]) {
                this.roots[rootX] = rootY;
            } else {
                this.roots[rootX] = rootY;
                this.heights[rootY] += 1;
            }
            this.numComponents -= 1;
            return true;
        }
    }
    find(x: number): number {
        if(x === this.roots[x]) {
            return x;
        }
        const root = this.find(this.roots[x]);
        this.roots[x] = root;
        return root;
    }
    getNumComponents(): number {
        return this.numComponents;
    }
}