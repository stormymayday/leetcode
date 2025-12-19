function heightChecker(heights: number[]): number {

    const n = heights.length;
    
    // Phase 1: fill out the 'bucket's array
    // Note: 101 items to account for 0
    const buckets = new Array(101).fill(0);
    for(let i = 0; i < n; i += 1) {
        buckets[heights[i]] += 1;
    }
    
    // Phase 2: fill out the 'expected' array using 'buckets'
    const expected = new Array(n);
    let idx = 0;
    for(let i = 0; i < buckets.length; i += 1) {
        if(buckets[i] !== 0) {
            for(let j = 0; j < buckets[i]; j += 1) {
                expected[idx] = i;
                idx += 1;
            }
        }
    }

    // Phase 3: compare 'heights' vs 'expected'
    let diffCount = 0;
    for(let i = 0; i < n; i += 1) {
        if(heights[i] !== expected[i]) {
            diffCount += 1;
        }
    }
    return diffCount;
    
};