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


        if (
            // Child must have been assigned a parent earlier, and thus child has multiple parents.
            childRoot !== child ||
            // If parent and child already belong to the same subset
            // Then there must be a directed path from child to parent as parent must have been assigned to the subset of child earlier
            // and thus there exists a cycle.
            parentRoot === childRoot) {
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