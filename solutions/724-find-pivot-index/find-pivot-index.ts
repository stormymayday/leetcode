function pivotIndex(nums: number[]): number {
    for(let p = 0; p < nums.length; p += 1){
        let leftSum = 0;
        for(let l = 0; l < p; l += 1) {
            leftSum += nums[l];
        } 
        let rightSum = 0;
        for(let r = nums.length - 1; r > p; r -= 1) {
            rightSum += nums[r];
        }
        if(leftSum === rightSum) {
            return p;
        }
        
    }
    return -1;
};