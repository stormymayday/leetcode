function smallestDistancePair(nums: number[], k: number): number {

    const sortedNums = [...nums].sort((a, b) => a - b);

    let left = 0;
    let right = sortedNums[sortedNums.length - 1];
    // let candidate = -1;
    while(left <= right) {

        // this middle value is the 'difference' we need to check
        const mid = left + Math.floor((right - left) / 2);

        // need to get a count of pairs whose absDiff is <= 'mid'
        const numPairs = countPairs(sortedNums, mid);

        if(numPairs >= k) {
            // potential candidate
            // candidate = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }

    }
    // can also return 'left'?
    // return candidate;
    return left;
    
};

function countPairs(sortedNums: number[], targDiff: number): number {

    let res: number = 0;
    let left = 0;

    for(let right = 0; right < sortedNums.length; right += 1) {

        // const currDiff = sortedNums[right] - sortedNums[left];

        // current difference is greater than target difference
        while(sortedNums[right] - sortedNums[left] > targDiff) {
            left += 1; // shrinking from 'left'
        }

        // add pair count
        res += right - left

    }

    return res;

}