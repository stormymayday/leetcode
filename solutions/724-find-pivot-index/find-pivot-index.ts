function pivotIndex(nums: number[]): number {
    
    for(let i = 0; i < nums.length; i += 1) {

        let leftSum = 0;
        let rightSum = 0;

        for(let left = 0; left < i; left += 1) {
            leftSum += nums[left];
        }

        for(let right = i + 1; right < nums.length; right += 1) {
            rightSum += nums[right];
        }

        if(leftSum === rightSum) {
            return i;
        }

    }

    return -1;

};