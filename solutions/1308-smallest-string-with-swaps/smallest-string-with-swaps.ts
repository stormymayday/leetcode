function smallestStringWithSwaps(s: string, pairs: number[][]): string {

    // 1. Union all edges (pairs)
    const n = s.length;
    const uf = new UnionFind(n);
    for(const [src ,dst] of pairs) {
        uf.union(src, dst);
    }

    // 2. Create a mapping (key: root (index) -> val: [characters])
    const rootToChars = new Map<number, string[]>();
    for(let i = 0; i < n; i += 1) {
        // 2.1 find root of the current index value
        const root = uf.find(i);
        // 2.2 Create a map entry for the root if it does not exist
        if(!rootToChars.has(root)) {
            rootToChars.set(root, []);
        }
        // 2.3 push character at current index into the array
        rootToChars.get(root).push(s[i]);
    }

    // 3. Sort the string arrays (map values) for each root in an descending order
    // Such that they can be 'popped' into the 'result' at O(1) time
    for(const chars of rootToChars.values()) {
        chars.sort((a, b) => b.localeCompare(a));
    }

    // 4. Creating the result
    const res: string[] = [];
    // Loop over indicies of the input string
    for(let i = 0; i < n; i += 1) {

        // 4.1 Get root of the current index
        const root = uf.find(i);

        // 4.2 Get the char from the 'rootToChars' map
        // The array is sorted in descending order
        // Therefore, last char is lexicographically smallest
        const char = rootToChars.get(root).pop();

        // 4.3 push char into the result
        res.push(char);

    }
    return res.join("");

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
                this.sizes.set(rootY, this.sizes.get(rootY) + this.sizes.get(rootX));
            }
            this.numComponents -= 1;
            return true;
        }
    }
}