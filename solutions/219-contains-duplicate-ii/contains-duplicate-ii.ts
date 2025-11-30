function containsNearbyDuplicate(nums: number[], k: number): boolean {

    const set = new Set<number>();

    let left = 0;
    for(let right = 0; right < nums.length; right += 1) {

        if(right - left + 1 > k + 1) {
            set.delete(nums[left]);
            left += 1;
        }
        
        if(set.has(nums[right])) {
            return true; // there is a duplicate in current window
        }

        set.add(nums[right]);

    }

    return false; // no duplicates
    
};