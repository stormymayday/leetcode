function containsNearbyDuplicate(nums: number[], k: number): boolean {

    const windowSet = new Set<number>();
    let left = 0;
    for (let right = 0; right < nums.length; right += 1) {

        // window size should not exceed right - left <= k
        if (right - left > k) {
            windowSet.delete(nums[left]);
            left += 1;
        }

        if (windowSet.has(nums[right])) {
            return true;
        } else {
            windowSet.add(nums[right]);
        }

    }

    return false;

};