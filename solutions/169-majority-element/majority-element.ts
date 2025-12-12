function majorityElement(nums: number[]): number {
    
    const n = nums.length;
    let majorityEl;
    let count = 0;

    for(let i = 0; i < n; i += 1) {
        if(count === 0) {
            majorityEl = nums[i];
            count = 1;
        } else if(nums[i] === majorityEl) {
            count += 1;
        } else {
            count -= 1;
        }
    }

    count = 0;
    for(let i = 0; i < n; i += 1) {
        if(nums[i] === majorityEl) {
            count += 1;
        }
    }

    return count > Math.floor(n / 2) ? majorityEl : -1;

};