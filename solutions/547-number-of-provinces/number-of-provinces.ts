function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const unionFind = new UnionFind(n);
    for(let row = 0; row < n; row += 1) {
        for(let col = 0; col < n; col += 1) {
            if(isConnected[row][col] === 1) {
                unionFind.union(row, col);
            }
        }
    }
    return unionFind.getNumComponents();
};

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
    find(x: number): number {
        const parent = this.roots.get(x);
        if (parent !== x) {
            this.roots.set(x, this.find(parent));
        }
        return this.roots.get(x);
    }
    union(x: number, y: number): boolean {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if(rootX !== rootY) {
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
        } else {
            return false;
        }
    }
    getNumComponents(): number {
        return this.numComponents;
    }
}