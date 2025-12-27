class RandomizedSet {

    numsToIdx: Map<number, number>;
    nums: number[];

    constructor() {
        this.numsToIdx = new Map<number, number>();
        this.nums = [];
    }

    insert(val: number): boolean {
        
        if(this.numsToIdx.has(val)) {
            return false;
        } else {
            this.numsToIdx.set(val, this.nums.length);
            this.nums.push(val);
            return true;
        }

    }

    remove(val: number): boolean {
        
        if(!this.numsToIdx.has(val)) {
            return false;
        } else {

            const lastNum = this.nums[this.nums.length - 1];

            if(val === lastNum) {
                this.nums.pop();
                this.numsToIdx.delete(val);
            } else {

                const numIdx = this.numsToIdx.get(val);

                this.nums[numIdx] = lastNum;
                // this.nums[this.nums.length - 1] = val;
                this.nums.pop();

                this.numsToIdx.set(lastNum, numIdx);
                this.numsToIdx.delete(val);

            }

            return true;

        }

    }

    getRandom(): number {
        return this.nums[ Math.floor(Math.random() * this.nums.length) ];
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */