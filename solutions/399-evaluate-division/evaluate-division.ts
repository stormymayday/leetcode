class ModifiedUnionFind {
    private roots: Map<string, string>;   // Stores each node's parent
    private weights: Map<string, number>; // Stores weight from a node to its parent (i.e., x / parent[x])

    constructor() {
        this.roots = new Map();
        this.weights = new Map();
    }

    // Ensures the variable exists in the structure, initialized to itself with weight 1
    add(x: string): void {
        if (!this.roots.has(x)) {
            this.roots.set(x, x);       // Initially, a node is its own root
            this.weights.set(x, 1);     // Weight from x to itself is 1
        }
    }

    // Finds the root of x, applies path compression, and updates weights
    find(x: string): string {
        const parent = this.roots.get(x);
        if (parent !== x) {
            // Recursively find the root of x's parent
            // const root = this.find(parent);

            // Path compression: directly link x to its root
            this.roots.set(x, this.find(parent));

            // Update the weight: x / root = (x / parent) * (parent / root)
            this.weights.set(x, this.weights.get(x)! * this.weights.get(parent)!);

            // return root;
        }
        // return parent!;
        return this.roots.get(x);
    }

    // Connects two variables with a given ratio (x / y = quotient)
    union(dividend: string, divisor: string, quotient: number): void {
        this.add(dividend); // Ensure both nodes exist
        this.add(divisor);

        const rootX = this.find(dividend);
        const rootY = this.find(divisor);

        if (rootX !== rootY) {
            // Connect rootX to rootY
            this.roots.set(rootX, rootY);

            // Update the weight:
            // weight[rootX] = (quotient * weight[divisor]) / weight[dividend]
            //
            // Why?
            // quotient = dividend / divisor
            // dividend = rootX * weight[dividend]
            // divisor  = rootY * weight[divisor]
            // ⇒ (rootX * weight[dividend]) / (rootY * weight[divisor]) = quotient
            // Rearranged ⇒ rootX / rootY = (quotient * weight[divisor]) / weight[dividend]
            this.weights.set(rootX, (quotient * this.weights.get(divisor)!) / this.weights.get(dividend)!);
        }
    }

    // Returns the ratio of dividend / divisor if they're connected, else -1
    getRatio(dividend: string, divisor: string): number {
        if (!this.roots.has(dividend) || !this.roots.has(divisor)) {
            return -1; // Either variable is unknown
        }

        if (this.find(dividend) !== this.find(divisor)) {
            return -1; // They’re not connected
        }

        // Since they have the same root, dividend / divisor = weight[dividend] / weight[divisor]
        return this.weights.get(dividend)! / this.weights.get(divisor)!;
    }
}

// Solves the equation system and evaluates each query
function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const uf = new ModifiedUnionFind();

    // Step 1: Build Union-Find structure using given equations
    for (let i = 0; i < equations.length; i += 1) {
        const [dividend, divisor] = equations[i];
        const quotient = values[i];
        uf.union(dividend, divisor, quotient); // Add the equation: dividend / divisor = quotient
    }

    // Step 2: Evaluate each query
    const result: number[] = [];
    for (const query of queries) {
        const [dividend, divisor] = query;
        result.push(uf.getRatio(dividend, divisor)); // Get the ratio or -1
    }

    return result;
}