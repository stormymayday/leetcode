function containsNearbyDuplicate(nums: number[], k: number): boolean {

    const windowSet = new Set<number>();

    // window is of size k + 1
    for(let i = 0; i < nums.length && i <= k; i += 1) {
        if(windowSet.has(nums[i])) {
            return true;
        } else {
            windowSet.add(nums[i]);
        }
    }

    let left = 0;
    for(let right = k + 1; right < nums.length; right += 1) {

        windowSet.delete(nums[left]);

        left += 1;

        if(windowSet.has(nums[right])) {
            return true;
        } else {
            windowSet.add(nums[right]);
        }

    }

    return false;
    
};