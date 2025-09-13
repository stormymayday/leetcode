function numSimilarGroups(strs: string[]): number {
    
    const uf = new UnionFind(strs.length);

    // Check ALL pairs
    for(let i = 0; i < strs.length - 1; i += 1) {
        for(let j = i + 1; j < strs.length; j += 1) {

            const str1 = strs[i];
            const str2 = strs[j];

            let diffs = 0;
            for(let char = 0; char < str1.length; char += 1) {
                if(str1[char] !== str2[char]) {
                    diffs += 1;
                    if(diffs > 2) {
                        break;
                    }
                }
            }
            // strings that differ by exactly 2 characters are still similar
            if(diffs <= 2) {
                uf.union(i, j);
            }
        }
    }

    return uf.getNumComponents();

};

function areSimilar(a: string, b: string): boolean {
    if (a === b) return true;

    const diffs: number[] = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            diffs.push(i);
            if (diffs.length > 2) return false;
        }
    }

    return (
        diffs.length === 2 &&
        a[diffs[0]] === b[diffs[1]] &&
        a[diffs[1]] === b[diffs[0]]
    );
}

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
    find(x: number):number {
        const parent = this.roots.get(x);
        if(parent !== x) {
            this.roots.set(x, this.find(parent));
        }
        return this.roots.get(x);
    }
    getNumComponents():number {
        return this.numComponents;
    }
}