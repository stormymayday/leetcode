function majorityElement(nums: number[]): number {
    
    const n = nums.length;
    let count = 1;
    let majEl = nums[0];

    for(let i = 1; i < n; i += 1) {
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

    // Optional: Verification Step incase there might not be a majority element
    count = 0;
    for(let i = 0; i < n; i += 1) {
        if(nums[i] === majEl) {
            count += 1;
        }
    }
    return count > Math.floor(n / 2) ? majEl : -1;

};