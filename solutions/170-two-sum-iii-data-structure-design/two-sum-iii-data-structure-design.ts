class TwoSum {

    nums: number[];
    numToIdx: Map<number, number[]>; // key: number, value: array of indices to differentiate between the same numbers

    constructor() {
        this.nums = [];
        this.numToIdx = new Map<number, number[]>();
    }

    add(number: number): void {
        
        // 1. Adding number to the hash map
        if(!this.numToIdx.has(number)) {
            this.numToIdx.set(number, []);
        }
        // Using current length (before adding the number) as the index
        this.numToIdx.get(number).push(this.nums.length);
        // 2. Pushing to the array (length increases)
        this.nums.push(number);

    }

    find(value: number): boolean {

        for(const [num, indices] of this.numToIdx.entries()) {

            const diff = value - num;

            if(this.numToIdx.has(diff)) {
                
                // Different numbers - any pair works
                if(diff !== num) {
                    return true;
                }
                // Same number - need at least 2 occurrences
                if(indices.length > 1) {
                    return true;
                }

            }

        }

        return false;

    }
}

/**
 * Your TwoSum object will be instantiated and called as such:
 * var obj = new TwoSum()
 * obj.add(number)
 * var param_2 = obj.find(value)
 */