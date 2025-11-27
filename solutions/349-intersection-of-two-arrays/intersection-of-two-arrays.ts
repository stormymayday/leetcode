function intersection(nums1: number[], nums2: number[]): number[] {

    const set1 = new Set<number>(nums1);
    const res = new Set<number>();

    for(let i = 0; i < nums2.length; i += 1) {
        if(set1.has(nums2[i])) {
            res.add(nums2[i]);
        }
    }
    
    return Array.from(res);
};