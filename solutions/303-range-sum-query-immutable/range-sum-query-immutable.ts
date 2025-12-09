class NumArray {
    prefixSums: number[];
    constructor(nums: number[]) {
        this.prefixSums = [];
        let prefixSum = 0;
        for(let i = 0; i < nums.length; i += 1) {
            prefixSum += nums[i];
            this.prefixSums.push(prefixSum);
        }
    }

    sumRange(left: number, right: number): number {
        return left === 0 ? this.prefixSums[right] : this.prefixSums[right] - this.prefixSums[left - 1];
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */