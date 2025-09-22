function canTraverseAllPairs(nums: number[]): boolean {

    // Edge Case 1: single element array
    if (nums.length === 1) {
        return true;
    }

    // Edge Case 2: if any number is 1, it can't connect to others via GCD > 1
    if(nums.includes(1)) {
        return false;
    }
 
    const uf = new UnionFind(nums.length);

    // 1. Get factors for each number and create a mapping of factor to number indices
    const factorToNums = new Map<number, number[]>();
    for (let idx = 0; idx < nums.length; idx += 1) {
        const num = nums[idx];
        // 1.1. Get all factors for the current num
        const factors = getFactors(num);
        for (const factor of factors) {
            // 1.2. Create a mapping: factor to the nums
            if (!factorToNums.has(factor)) {
                factorToNums.set(factor, []);
            }
            factorToNums.get(factor).push(idx);
        }
    }

    // 2. Perform union on numbers for each factor
    for (const numIndicies of factorToNums.values()) {
        for (let i = 0; i < numIndicies.length - 1; i += 1) {
            const idx1 = numIndicies[i];
            const idx2 = numIndicies[i + 1];
            uf.union(idx1, idx2);
        }
    }

    return uf.getNumComponents() === 1;

};

function getFactors(num: number): number[] {

    // Use a Set to store factors to avoid duplicates
    const factors = new Set<number>();

    // Start checking from 2, because 1 is common factor for all the numbers
    // Therefore, if 1 is included 1 as a factor, then every number would be “connected” through 1, because 1 divides all numbers.
    let factor = 2;

    // Only need to check divisors up to the square root of num
    // Any factor greater than sqrt(num) has a complementary factor less than sqrt(num)
    while (factor * factor <= num) {
        // If factor divides num exactly
        if (num % factor === 0) {
            // Add the small factor
            factors.add(factor);
            // Add the complementary (larger) factor
            factors.add(num / factor);
        }
        // Move to the next potential factor
        factor += 1;
    }

    // Edge Case: Include the number itself to ensure primes are unioned properly
    factors.add(num);

    // Convert Set to array and return all factors
    return [...factors];
}

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    private numComponents: number;
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
    getNumComponents(): number {
        return this.numComponents;
    }
}