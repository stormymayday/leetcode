function canPartitionKSubsets(nums: number[], k: number): boolean {

    const n = nums.length;

    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    if(sum % k !== 0) {
        // If total sum of nums is not divisble by k, we can exit early
        return false;
    }

    // Optimization: sort in descending order
    const sorted = nums.sort((a, b) => b - a);
    const bucketSize = sum / k;
    if(sorted[0] > bucketSize) {
        // if the largest element is greater than the bucket size, we can exit early
        return false;
    }

    // to keep track which elemnt was already used
    const used = new Array(n).fill(false);
    function helper(index, k, currentBucket): boolean {
        // Base Case 1: if we reduce k to 1 (slight optimization)
        // we don't have to check for k === 0 because
        // if k reaches 1 we know that it must be of valid 'bucket' size
        if(k === 1) {
            return true;
        }

        // Base Case 2: if current buckets fills up
        if(currentBucket === bucketSize) {
            // we can reduce k by 1 and restart the recursion
            return helper(0, k - 1, 0);
        }

        // i = index
        for(let i = index; i < n; i += 1) {

            if(used[i] === false && currentBucket + sorted[i] <= bucketSize) {
                
                // Choice: use current element
                currentBucket += sorted[i];
                used[i] = true;

                // Explore with current element
                if(helper(i + 1, k, currentBucket) === true) {
                    return true;
                }

                // Backtrack
                currentBucket -= sorted[i];
                used[i] = false;

            }

        }

        return false;
    }

    return helper(0, k, 0);
};