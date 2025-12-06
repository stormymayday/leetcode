function majorityElement(nums: number[]): number {
    
    let count = 1;
    let majEl = nums[0];

    for(let i = 1; i < nums.length; i += 1) {
        if(nums[i] === majEl) {
            count += 1;
        } else {
            count -= 1;
            if(count < 0) {
                majEl = nums[i];
                count = 1;
            }
        }
    }

    return majEl;

};