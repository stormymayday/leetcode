class NumArray {

    prefix: number[];

    constructor(nums: number[]) {
        let total = 0;
        this.prefix = [];
        for(let i = 0; i < nums.length; i += 1) {
            total += nums[i];
            this.prefix.push(total);
        }
    }

    sumRange(left: number, right: number): number {
        const prefixRight = this.prefix[right];
        const prefixLeft = left > 0 ? this.prefix[left - 1] : 0;
        return prefixRight - prefixLeft;
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */