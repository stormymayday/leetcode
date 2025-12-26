class TwoSum {

    nums: number[];
    numToIdx: Map<number, number[]>;

    constructor() {
        this.nums = [];
        this.numToIdx = new Map<number, []>;
    }

    add(number: number): void {
        
        if(!this.numToIdx.has(number)) {
            this.numToIdx.set(number, []);
        }
        this.numToIdx.get(number).push(this.nums.length);
        this.nums.push(number);

    }

    find(value: number): boolean {

        for(let i = 0; i < this.nums.length; i += 1) {

            const diff = value - this.nums[i];

            // Difference exists
            if(this.numToIdx.has(diff)) {

                const indices = this.numToIdx.get(diff);
                
                for(let j = 0; j < indices.length; j += 1) {

                    if(i !== indices[j]) {
                        return true;
                    }

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