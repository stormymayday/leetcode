function containsNearbyDuplicate(nums: number[], k: number): boolean {

    for(let i = 0; i < nums.length; i += 1) {
        for(let j = i + 1; j < nums.length && j <= i + k; j += 1) {
            if(nums[i] === nums[j]) {
                return true;
            }
        }
    }

    return false;
    
};