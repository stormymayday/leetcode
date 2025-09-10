function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {

    const n = equations.length;
    
    // 1. Initialize UnionFind
    const uf = new ModifiedUnionFind();
    for(let i = 0; i < n; i += 1) {
        const [dividend, divisor] = equations[i];
        const quotient = values[i];
        uf.union(dividend, divisor, quotient);
    }

    // 2. Process queries and get the result
    const res: number[] = [];
    for(const [dividend, divisor] of queries) {
        res.push(uf.getRatio(dividend, divisor));
    }
    return res;

};

class ModifiedUnionFind {

    // standard node to root mapping
    private roots: Map<string, string>;

    // Ratio of node / parent (eventually root)
    // Initially, this stores ratio to node's immediate parent
    // However, after running 'find' method it will update ratio towards root
    private ratioToParent: Map<string, number>;

    constructor() {
        this.roots = new Map();
        this.ratioToParent = new Map();
    }

    add(x: string): void {
        if(!this.roots.has(x)) {
            // Setting node as it's own root
            this.roots.set(x, x);
            // Initial ratio is 1 ( x / x = 1)
            this.ratioToParent.set(x, 1);
        }
    }

    find(x: string): string {
        const root = this.roots.get(x);
        if(root !== x) {
            // Path compression
            this.roots.set(x, this.find(root));
            // Update ratio
            this.ratioToParent.set(x, this.ratioToParent.get(x) * this.ratioToParent.get(root));
        }
        return this.roots.get(x);
    }

    union(dividend: string, divisor: string, quotioent: number): void {

        // 1. Adding nodes
        this.add(dividend);
        this.add(divisor);

        // 2. Fetching roots
        const dividendRoot = this.find(dividend);
        const divisorRoot = this.find(divisor);

        // 3. Check if roots are not already connected
        if(dividendRoot !== divisorRoot) {
            // 3.1. Connecting roots
            this.roots.set(dividendRoot, divisorRoot);
            // 3.2. Setting the ratio (don't understand this)
            this.ratioToParent.set(dividendRoot, (quotioent * this.ratioToParent.get(divisor) / this.ratioToParent.get(dividend)));
        }

    }

    getRatio(dividend: string, divisor: string): number {
        // Check if either doesn't exist
        if(!this.roots.has(dividend) || !this.roots.has(divisor)) {
            return -1;
        }

        // Check if their root is not the same AKA they are not connected
        if(this.find(dividend) !== this.find(divisor)) {
            return -1;
        }

        // Otherwise, get the ratio
        return this.ratioToParent.get(dividend) / this.ratioToParent.get(divisor);
    }

}