function intersection(nums1: number[], nums2: number[]): number[] {

    // const duplicates: number[] = [];
    const hashMap: Set<number> = new Set();
    const intersection: Set<number> = new Set();

    for(let i = 0; i < nums1.length; i++) {
        hashMap.add(nums1[i]);
    }

    for(let i = 0; i < nums2.length; i++) {
        if(hashMap.has(nums2[i])) {
            intersection.add(nums2[i]);
        }
    }


    return Array.from(intersection);
    
};