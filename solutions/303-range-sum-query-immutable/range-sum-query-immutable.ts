class NumArray {

    prefixSums: number[];

    constructor(nums: number[]) {
        
        this.prefixSums = [];
        let sum = 0;
        for(let i = 0; i < nums.length; i+= 1) {
            sum += nums[i];
            this.prefixSums.push(sum);
        }

    }

    sumRange(left: number, right: number): number {
        
        return this.prefixSums[right] - (left > 0 ? this.prefixSums[left - 1] : 0);

    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */