function check(nums: number[]): boolean {

    if(nums.length === 1) {
        return true;
    }

    const n = nums.length;

    let left = 0;
    for(let right = 1; right < 2 * n; right += 1) {

        // look back
        if(nums[right % n] < nums[(right -1) % n]) {
            left = right;
        }

        if(right - left + 1 === n) {
            return true;
        }

    }

    return false;
    
};