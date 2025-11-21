function findKthPositive(arr: number[], k: number): number {

    let missingNums: number[] = [];

    // For O(1) lookup
    const numsSet = new Set<number>(arr);
    
    // Phase 1: find missing numbers from 1 up to maximum number in the array  
    for(let i = 1; i <= Math.max(...arr); i += 1) {
        if(!numsSet.has(i)) {
            missingNums.push(i);
        }
    }

    // If number of missing nums is less than k
    if(missingNums.length < k) {
        let missingExtra = k - missingNums.length;
        for(let i = 1; i <= missingExtra; i += 1) {
            missingNums.push(arr[arr.length - 1] + i);
        }
    }
    
    return missingNums[k - 1];
};