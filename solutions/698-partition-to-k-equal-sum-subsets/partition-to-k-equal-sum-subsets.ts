function canPartitionKSubsets(nums: number[], k: number): boolean {

    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    if(sum % k !== 0) {
        return false;
    }

    const bucketSize = sum / k;
    const sorted = nums.sort((a, b) => b - a);
    if(sorted[0] > bucketSize) {
        return false;
    }

    const buckets = new Array(k).fill(0);

    function helper(index) {
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