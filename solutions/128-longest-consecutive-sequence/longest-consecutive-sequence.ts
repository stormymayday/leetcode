function longestConsecutive(nums: number[]): number {
    const uf = new UnionFind(nums);
    const numSet = new Set(nums);
    for(let i = 0; i < nums.length; i += 1) {
        const num = nums[i];
        if(numSet.has(num + 1)) {
            uf.union(num, num + 1);
        }
    }
    return uf.getLargestComponentSize();
};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    constructor(nums: number[]) {
        this.roots = new Map();
        this.sizes = new Map();
        for(let i = 0; i < nums.length; i += 1) {
            const num = nums[i];
            this.roots.set(num, num);
            this.sizes.set(num, 1);
        }
    }
    find(x: number):number {
        const root = this.roots.get(x);
        if(root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(x: number, y: number):boolean {
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
    getLargestComponentSize():number {
        let largest = 0;
        // Only check nodes that are actually roots
        for (const [node, root] of this.roots.entries()) {
            if (node === root) {
                const size = this.sizes.get(node) || 0;
                largest = Math.max(largest, size);
            }
        }
        return largest;
    }
}