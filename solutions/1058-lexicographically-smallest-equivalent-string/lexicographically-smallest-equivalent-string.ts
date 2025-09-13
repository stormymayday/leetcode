function smallestEquivalentString(s1: string, s2: string, baseStr: string): string {

    const uf = new UnionFind();

    for(let i = 0; i < s1.length; i += 1) {
        uf.union(s1[i], s2[i]);
    }

    const res: string[] = [];
    for(let i = 0; i < baseStr.length; i += 1) {
        res.push(uf.find(baseStr[i]));
    }
    return res.join("");

    
};

class UnionFind {
    private roots: Map<string, string>;
    constructor() {
        this.roots = new Map();
    }
    add(x: string): void {
        if(!this.roots.has(x)) {
            this.roots.set(x, x);
        }
    }
    find(x: string): string {

        if(!this.roots.has(x)) {
            this.roots.set(x, x);
            return x;
        }

        const root = this.roots.get(x);
        if(root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(x: string, y: string): boolean {

        const rootX = this.find(x);
        const rootY = this.find(y);

        if(rootX === rootY) {
            return false;
        } else {
            if(this.roots.get(rootX) < this.roots.get(rootY)) {
                // If rootX is rootX is lexiographically smaller than rootY
                // Set rootY be rootX
                this.roots.set(rootY, rootX);
            } else {
                // Otherwise, set rootX be rootY
                this.roots.set(rootX, rootY)
            }
            return true;
        }

    }
}