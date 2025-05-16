function intersect(nums1: number[], nums2: number[]): number[] {
    
    const freqMap1 = {};
    for(const num of nums1) {
        if(!(num in freqMap1)) {
            freqMap1[num] = 0;
        }
        freqMap1[num] += 1;
    }

    const freqMap2 = {};
    for(const num of nums2) {
        if(!(num in freqMap2)) {
            freqMap2[num] = 0;
        }
        freqMap2[num] += 1;
    }

    const result = [];
    for(const num in freqMap1) {
        if(num in freqMap2) {
            const count = Math.min(freqMap1[num], freqMap2[num]);
            for(let i = 0; i < count; i++) {
                result.push(parseInt(num));
            }
        }
    }

    return result;

};