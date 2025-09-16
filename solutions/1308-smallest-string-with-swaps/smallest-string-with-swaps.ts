function smallestStringWithSwaps(s: string, pairs: number[][]): string {

    const uf = new UnionFind(s.length);
    for(const [src, dst] of pairs) {
        uf.union(src, dst);
    }

    const rootToComponent = new Map<number, string[]>();
    for(let i = 0; i < s.length; i += 1) {
        rootToComponent.set(i, []);
    }
    for(let i = 0; i < s.length; i += 1) {
        const root = uf.find(i);
        const char = s[i];
        rootToComponent.get(root).push(char);
    }
    for(const component of rootToComponent.values()) {
        // sorting in descending order 
        // lexiographically smaller characters will be at the end
        component.sort((a, b) => b.localeCompare(a));
    }

    const res: string[] = [];
    for(let i = 0; i < s.length; i += 1) {
        const char: string = rootToComponent.get(uf.find(i)).pop();
        res.push(char);
    }
    return res.join("");

};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
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
            return true;
        }
    }
}