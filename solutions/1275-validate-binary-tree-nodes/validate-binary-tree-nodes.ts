function validateBinaryTreeNodes(n: number, leftChild: number[], rightChild: number[]): boolean {

    const uf = new UnionFind(n);

    for (let i = 0; i < n; i += 1) {

        if (leftChild[i] !== -1) {
            if (uf.union(i, leftChild[i]) === false) {
                return false; // cycle
            }
        }

        if (rightChild[i] !== -1) {
            if (uf.union(i, rightChild[i]) === false) {
                return false; // cycle
            }
        }

    }

    return uf.getNumComponents() === 1;

};

class UnionFind {
    roots: Map<number, number>;
    sizes: Map<number, number>;
    numComponents: number;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
        this.numComponents = n;
        for (let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
            this.sizes.set(i, 1);
        }
    }
    find(x: number): number {
        const root = this.roots.get(x);
        if (root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(parent: number, child: number): boolean {
        const parentRoot = this.find(parent);
        const childRoot = this.find(child);

        // Tree constraint: child must not have a parent yet
        if (childRoot !== child || parentRoot === childRoot) {
            return false;
        }

        this.roots.set(childRoot, parentRoot);
        this.numComponents -= 1;
        return true;
    }
    getNumComponents(): number {
        return this.numComponents;
    }
}