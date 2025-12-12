function majorityElement(nums: number[]): number {
    
    let majorityEl;
    let count = 0;

    for(let i = 0; i < nums.length; i += 1) {
        if(count === 0) {
            majorityEl = nums[i];
            count = 1;
        } else if(nums[i] === majorityEl) {
            count += 1;
        } else {
            count -= 1;
        }
    }

    return majorityEl;

};