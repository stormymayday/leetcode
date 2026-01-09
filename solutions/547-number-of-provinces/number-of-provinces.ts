function findCircleNum(isConnected: number[][]): number {

    const n = isConnected.length;

    const uf = new UnionFind(n);

    for (let i = 0; i < n; i += 1) {
        for (let j = i + 1; j < n; j += 1) {
            if (isConnected[i][j] === 1) {
                uf.union(i, j);
            }
        }
    }

    return uf.getNumComponents();

};

class UnionFind {
    roots: Map<number, number>;
    sizes: Map<number, number>;
    numComponents: number;
    constructor(n: number) {
        this.numComponents = n;
        this.roots = new Map();
        this.sizes = new Map();
        for (let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
            this.sizes.set(i, 1);
        }
    }
    find(x: number): number {
        const root = this.roots.get(x)!;
        if (root === x) {
            return x;
        }

        const actualRoot = this.find(root);
        this.roots.set(x, actualRoot);
        return actualRoot;
    }
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return false;
        } else {

            const sizeX = this.sizes.get(rootX)!;
            const sizeY = this.sizes.get(rootY)!;

            if (sizeX >= sizeY) {
                this.roots.set(rootY, rootX);
                this.sizes.set(rootX, sizeX + sizeY);
            } else {
                this.roots.set(rootX, rootY);
                this.sizes.set(rootY, sizeY + sizeX);
            }

            this.numComponents -= 1;
            return true;

        }
    }
    getNumComponents(): number {
        return this.numComponents;
    }
}