function findNumbers(nums: number[]): number {

    const n = nums.length;

    let count = 0;

    for(let i = 0; i < n; i += 1) {
        const curr = String(nums[i]);
        if(curr.length % 2 === 0) {
            count += 1;
        }
    }

    return count;
    
};