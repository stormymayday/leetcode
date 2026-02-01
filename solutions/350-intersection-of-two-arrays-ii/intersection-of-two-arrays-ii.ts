function intersect(nums1: number[], nums2: number[]): number[] {

    const freqMap: Record<number, number> = {};
    for(let i = 0; i < nums1.length; i += 1) {
        if(!freqMap.hasOwnProperty(nums1[i])) {
            freqMap[nums1[i]] = 0;
        }
        freqMap[nums1[i]] += 1;
    }

    const res = [];
    for(let i = 0; i < nums2.length; i += 1) {
        if(freqMap.hasOwnProperty(nums2[i])) {
            res.push(nums2[i]);
            freqMap[nums2[i]] -= 1;
            if(freqMap[nums2[i]] === 0) {
                delete freqMap[nums2[i]];
            }
        }
    }
    return res;
};