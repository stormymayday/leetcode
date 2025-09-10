function largestComponentSize(nums: number[]): number {

    const uf = new UnionFind(nums);

    // 1. Get factors for each number and create a mapping of factor to numbers
    const factorToNums = new Map<number, number[]>();
    for (const num of nums) {
        // 1.1. Get all factors for the current num
        const factors = getFactors(num);
        for (const factor of factors) {
            // 1.2. Create a mapping: factor to the nums
            if (!factorToNums.has(factor)) {
                factorToNums.set(factor, []);
            }
            factorToNums.get(factor).push(num);
        }
    }

    // 2. Perform union on numbers for each factor
    for(const nums of factorToNums.values()) {
        for(let i = 0; i < nums.length -1; i += 1) {
            const num1 = nums[i];
            const num2 = nums[i + 1];
            uf.union(num1, num2);
        }
    }


    // 3. Get the largest component size
    return uf.getLargestComponent();

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