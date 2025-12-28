function intersect(nums1: number[], nums2: number[]): number[] {

    const freqMap = new Map<number, number>();
    for (let i = 0; i < nums1.length; i += 1) {
        freqMap.set(nums1[i], (freqMap.get(nums1[i]) || 0) + 1);
    }

    const intersection: number[] = [];
    for (let i = 0; i < nums2.length; i += 1) {
        if (freqMap.has(nums2[i])) {
            intersection.push(nums2[i]);
            freqMap.set(nums2[i], (freqMap.get(nums2[i])) - 1);
            if(freqMap.get(nums2[i]) === 0) {
                freqMap.delete(nums2[i]);
            }
        }
    }
    return intersection;

};