function longestConsecutive(nums: number[]): number {

    // Edge Case: empty input
    if(nums.length === 0) {
        return 0;
    }
    
    const uniqueNums = new Set(nums); // O(n)
    
    const uf = new UnionFind([...uniqueNums]); // O(n)

    for(const num of uniqueNums) { // O(n)
        // Check if there a number strictly greater by 1
        if(uniqueNums.has(num + 1)) { // O(1);
            // These two nums form a sequence
            uf.union(num, num + 1); // ~O(1) ammortized constant time
        }
     }

     return uf.getLargestComponentSize();

};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    private numComponents: number;
    constructor(nums: number[]) {
        this.roots = new Map();
        this.sizes = new Map();
        this.numComponents = nums.length;
        for(let i = 0; i < nums.length; i += 1) {
            this.roots.set(nums[i], nums[i]);
            this.sizes.set(nums[i], 1);
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
                this.sizes.set(rootX, this.sizes.get(rootY) + this.sizes.get(rootX));
            } else {
                this.roots.set(rootX, rootY);
                this.sizes.set(rootY, this.sizes.get(rootY) + this.sizes.get(rootX));
            }
            this.numComponents -= 1;
            return true;
        }
    }
    getLargestComponentSize() {
        return Math.max(...this.sizes.values());
    }
}