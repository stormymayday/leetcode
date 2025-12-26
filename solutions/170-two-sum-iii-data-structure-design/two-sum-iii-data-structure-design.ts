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

        // Linear scan each number: can this be optimized?
        for(let i = 0; i < this.nums.length; i += 1) {

            const diff = value - this.nums[i];

            // Difference exists
            if(this.numToIdx.has(diff)) {
                
                // O(n) - if need the actual indices
                // const indices = this.numToIdx.get(diff);
                // for(let j = 0; j < indices.length; j += 1) {
                //     if(i !== indices[j]) {
                //         return [i, j];
                //     }
                // }

                // O(1) - simple true / false
                // Numbers are different
                if(diff !== this.nums[i]) {
                    return true;
                } 
                // Numbers are the same (length of 'indices' array is greater than 1)
                if(this.numToIdx.get(diff).length > 1) {
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