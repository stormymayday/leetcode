function equationsPossible(equations: string[]): boolean {
    const uf = new UnionFind();
    // 1. First pass (merging)
    for (const equation of equations) {
        const x = equation[0];
        const y = equation[3];
        const sign = equation[1];
        if (sign === '=') {
            uf.union(x, y);
        }
    }
    // 2. Secomd pass (evaluating)
    for (const equation of equations) {
        const x = equation[0];
        const y = equation[3];
        const sign = equation[1];
        if (sign === '!') {
            if (uf.find(x) === uf.find(y)) {
                return false;
            }
        }
    }
    return true;
};

class UnionFind {
    private roots: Map<string, string>;
    private sizes: Map<string, number>;
    private numComponents: number;
    constructor() {
        this.roots = new Map();
        this.sizes = new Map();
        this.numComponents = 0;
    }
    add(x: string): void {
        if (!this.roots.has(x)) {
            this.roots.set(x, x);
            this.sizes.set(x, 1);
            this.numComponents += 1;
        }
    }
    find(x: string): string {
        // Add the node if it does not exist
        if (!this.roots.has(x)) {
            this.add(x);
        }
        const root = this.roots.get(x);
        if (root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(x: string, y: string): boolean {

        // First add the nodes
        this.add(x);
        this.add(y);

        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return false;
        } else {
            if (this.sizes.get(rootX) >= this.sizes.get(rootY)) {
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
}