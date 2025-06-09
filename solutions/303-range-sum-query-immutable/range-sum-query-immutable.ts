class NumArray {
    prefixSums: number[];
    constructor(nums: number[]) {
        this.prefixSums = [];
        let total = 0;
        for(let i = 0; i < nums.length; i += 1) {
            total += nums[i];
            this.prefixSums.push(total);
        }
    }

    sumRange(left: number, right: number): number {
        const prefixRight = this.prefixSums[right];
        let prefixLeft = 0;
        if(left > 0) {
            prefixLeft = this.prefixSums[left - 1];
        } else {
            prefixLeft = 0;
        }
        return prefixRight - prefixLeft;
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */