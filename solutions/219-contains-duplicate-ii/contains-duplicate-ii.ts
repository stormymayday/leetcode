function containsNearbyDuplicate(nums: number[], k: number): boolean {
    
    const windowSet = new Set<number>();
    let left = 0;
    for(let right = 0; right < nums.length; right += 1) {

        if(windowSet.size < k + 1) {
            if(windowSet.has(nums[right])) {
                return true;
            } else {
                windowSet.add(nums[right]);
            }
        } else {
            windowSet.delete(nums[left]);
            left += 1;

            if(windowSet.has(nums[right])) {
                return true;
            } else {
                windowSet.add(nums[right]);
            }

        }

    }

    return false;

};