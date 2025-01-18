function intersection(nums1: number[], nums2: number[]): number[] {

    const hashSet: Set<number> = new Set(nums1);
    const intersection = [];

    for(let i = 0; i < nums2.length; i++) {
        if(hashSet.has(nums2[i])) {
            intersection.push(nums2[i]);
            hashSet.delete(nums2[i])
        }
    }


    return intersection;
    
};