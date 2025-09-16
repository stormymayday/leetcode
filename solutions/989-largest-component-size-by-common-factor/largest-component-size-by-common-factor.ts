function largestComponentSize(nums: number[]): number {

    const uf = new UnionFind(nums);

    const factorToNums = new Map<number, number[]>;
    for(const num of nums) {
        const factors = getFactors(num);
        for(const factor of factors) {
            if(!factorToNums.has(factor)) {
                factorToNums.set(factor, []);
            }
            factorToNums.get(factor).push(num);
        }
    }

    for(const nums of factorToNums.values()) {
        for(let i = 0; i < nums.length - 1; i += 1) {
            uf.union(nums[i], nums[i + 1]);
        }
    }

    return uf.getLargestComponent();

};

function getFactors(num: number): number[] {
    const factors = new Set<number>();
    let factor = 2;
    while(factor * factor <= num) {
        if(num % factor === 0) {
            factors.add(factor);
            factors.add(num / factor);
        }
        factor += 1;
    }
    factors.add(num);
    return [...factors]
}

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    private numComponents: number;
    constructor(nums: number[]) {
        this.roots = new Map();
        this.sizes = new Map();
        this.numComponents = nums.length;
        for (let i = 0; i < nums.length; i += 1) {
            this.roots.set(nums[i], nums[i]);
            this.sizes.set(nums[i], 1);
        }
    }
    find(x: number): number {
        const root = this.roots.get(x);
        if (root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX === rootY) {
            return false;
        } else {
            if (this.sizes.get(rootX) >= this.sizes.get(rootY)) {
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
    getLargestComponent(): number {
        return Math.max(...this.sizes.values());
    }
}