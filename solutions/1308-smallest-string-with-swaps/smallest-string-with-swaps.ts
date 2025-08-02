function smallestStringWithSwaps(s: string, pairs: number[][]): string {
    const uf = new UnionFind(s.length);
    
    // 1. Union all swappable pairs
    for(const pair of pairs) {
        const [x, y] = pair;
        uf.union(x, y);
    }
    
    // 2. Group characters by their component root
    const rootToChars = new Map<number, string[]>();
    for (let index = 0; index < s.length; index++) {
        const root = uf.find(index);
        const char = s[index];
        if (!rootToChars.has(root)) {
            rootToChars.set(root, []);
        }
        rootToChars.get(root).push(char);
    }
    
    // 3. Sort characters within each component
    for (const chars of rootToChars.values()) {
        // sort chars in descending order
        chars.sort((a, b) => b.localeCompare(a)); // mutates the original array in place.
    }
    
    // 4. Create result by assigning sorted characters to positions
    const result: string[] = [];
    for(let i = 0; i < s.length; i += 1) {
        const root = uf.find(i);
        const char = rootToChars.get(root).pop();
        result.push(char);
    }
    return result.join("");
};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    private numComponents: number;
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
        const parent = this.roots.get(x);
        if(parent !== x) {
            this.roots.set(x, this.find(parent));
        }
        return this.roots.get(x);
    }
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if(rootX === rootY) {
            return false;
        } else {
            if(this.sizes.get(rootX) > this.sizes.get(rootY)) {
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