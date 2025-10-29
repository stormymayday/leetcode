function validateBinaryTreeNodes(n: number, leftChild: number[], rightChild: number[]): boolean {

    const uf = new UnionFind(n);

    for (let i = 0; i < n; i += 1) {
        if (leftChild[i] !== -1 && uf.union(i, leftChild[i]) === false) {
            return false;
        }
        if (rightChild[i] !== -1 && uf.union(i, rightChild[i]) === false) {
            return false;
        }
    }

    return uf.getNumComponents() === 1;

};

class UnionFind {
    roots: Map<number, number>;
    numComponents: number;
    constructor(n: number) {
        this.roots = new Map();
        this.numComponents = n;
        for (let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
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

        if (childRoot !== child || parentRoot === child) {
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