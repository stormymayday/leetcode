function canPartitionKSubsets(nums: number[], k: number): boolean {
    // Get total sum
    const total = nums.reduce((acc, curr) => acc + curr, 0);
    // Check if total is evenly divisble by k
    if(total % k !== 0) {
        return false;
    } 
    // Calculate target 'bucket' size
    const bucketSize = total / k;
    // Sort nums in descending order
    const sorted = nums.sort((a, b) => b - a);
    // Check if largest 'num' is greater than bucketSize
    if(sorted[0] > bucketSize) {
        return false;
    }
    const buckets = new Array(k).fill(0);
    function helper(index: number): boolean {
        if(index === sorted.length) {
            return true;
        }
        for(let i = 0; i < k; i += 1) {
            if(buckets[i] + sorted[index] <= bucketSize) {
                buckets[i] += sorted[index];
                if(helper(index + 1) === true) {
                    return true;
                }
                buckets[i] -= sorted[index];
                if(buckets[i] === 0) {
                    break;
                }
            }
        }
        return false;
    }
    return helper(0);
};