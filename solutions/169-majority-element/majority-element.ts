function majorityElement(nums: number[]): number {
    
    let majorityEl = nums[0];
    let count = 1;
    for(let i = 1; i < nums.length; i += 1) {
        if(nums[i] !== majorityEl) {
            count -= 1;
            if(count < 0) {
                majorityEl = nums[i];
                count = 1;
            }
        } else {
            count += 1;
        }
    }
    return majorityEl;

};