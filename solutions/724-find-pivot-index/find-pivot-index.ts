function pivotIndex(nums: number[]): number {
    
    let totalSum = nums.reduce((acc, curr) => acc + curr, 0);

    let leftSum = 0;
    for(let i = 0; i < nums.length; i += 1) {

        const curr = nums[i];

        const rightSum = totalSum - leftSum - curr;

        if(rightSum === leftSum) {
            return i;
        }

        leftSum += curr;

    }

    return -1;

};