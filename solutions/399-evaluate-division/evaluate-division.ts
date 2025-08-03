class ModifiedUnionFind {
    private roots: Map<string, string>;
    private weights: Map<string, number>;
    constructor() {
        this.roots = new Map();
        this.weights = new Map();
    }

    add(x: string): void {
        if (!this.roots.has(x)) {
            this.roots.set(x, x);
            this.weights.set(x, 1);
        }
    }

    find(x: string): string {
        const parent = this.roots.get(x)!;
        if (parent !== x) {
            const root = this.find(parent);
            this.roots.set(x, root);
            this.weights.set(x, this.weights.get(x)! * this.weights.get(parent)!);
            return root;
        }
        return parent;
    }

    union(dividend: string, divisor: string, quotient: number): void {
        this.add(dividend);
        this.add(divisor);
        const rootX = this.find(dividend);
        const rootY = this.find(divisor);
        if (rootX !== rootY) {
            this.roots.set(rootX, rootY);
            this.weights.set(rootX, (quotient * this.weights.get(divisor)!) / this.weights.get(dividend)!);
        }
    }

    getRatio(dividend: string, divisor: string): number {
        if (!this.roots.has(dividend) || !this.roots.has(divisor)) {
            return -1;
        }
        if (this.find(dividend) !== this.find(divisor)) {
            return -1;
        }
        return this.weights.get(dividend)! / this.weights.get(divisor)!;
    }
}

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const uf = new ModifiedUnionFind();
    for(let i = 0; i < equations.length; i += 1) {
        const [dividend, divisor] = equations[i];
        const quotient = values[i];
        uf.union(dividend, divisor, quotient);
    }
    const result: number[] = [];
    for(const query of queries) {
        const [dividend, divisor] = query;
        result.push(uf.getRatio(dividend, divisor));
    }
    return result;
};