function largestComponentSize(nums: number[]): number {

    const uf = new UnionFind(nums);

    // 1. Get factors for each number and map numbers to a factor
    const factorToNums = new Map<number, number[]>(); // key: factor -> val: numbers
    for (const num of nums) {

        const factors = getFactors(num);

        for (const factor of factors) {

            if (!factorToNums.has(factor)) {
                factorToNums.set(factor, []);
            }

            factorToNums.get(factor).push(num);

        }

    }

    // 2. Union numbers for each factor
    for (const nums of factorToNums.values()) {

        for (let i = 0; i < nums.length - 1; i += 1) {
            const num1 = nums[i];
            const num2 = nums[i + 1];
            uf.union(num1, num2);
        }

    }

    return uf.getLargestComponentSize();

};

function getFactors(num: number): number[] {
    const factors = new Set<number>();
    let factor = 2;
    while (factor * factor <= num) {
        if (num % factor === 0) {
            factors.add(factor);
            factors.add(num / factor);
        }
        factor += 1;
    }
    
    // Add the number itself as a factor since every number is divisible by itself.
    // This is crucial for three scenarios:
    // 1. Prime numbers: The loop above finds no factors, so we need to add the prime itself
    // 2. All numbers: We need the complete factor list including the number as its own factor
    // 3. Union-Find connectivity: Numbers need to connect with their multiples/divisors
    // Note: We check num > 1 to exclude 1, since the problem asks for factors > 1
    if (num > 1) {
        factors.add(num);
    }
    
    return [...factors];
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

    getLargestComponentSize(): number {
        let maxSize = -Infinity;
        for (const size of this.sizes.values()) {
            maxSize = Math.max(maxSize, size);
        }
        return maxSize;
    }

    getNumComponents(): number {
        return this.numComponents;
    }

}