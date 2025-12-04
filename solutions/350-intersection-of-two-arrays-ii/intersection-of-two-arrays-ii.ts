function intersect(nums1: number[], nums2: number[]): number[] {
    
    const nums1Count = new Map<number, number>();
    for(let i = 0; i < nums1.length; i += 1) {
        nums1Count.set(nums1[i], (nums1Count.get(nums1[i]) || 0) + 1);
    }

    const res: number[] = [];

    for(let i = 0; i < nums2.length; i += 1) {
        if(nums1Count.has(nums2[i])) {
            res.push(nums2[i]);
            nums1Count.set(nums2[i], nums1Count.get(nums2[i]) - 1);
            if(nums1Count.get(nums2[i]) === 0) {
                nums1Count.delete(nums2[i]);
            }
        }
    }

    return res;

};