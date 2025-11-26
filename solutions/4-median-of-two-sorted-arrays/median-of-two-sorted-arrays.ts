function findMedianSortedArrays(nums1: number[], nums2: number[]): number {

    // Let's make sure nums1 is the shorter array
    if(nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const combinedLength = nums1.length + nums2.length;
    const leftHalfSize = Math.floor((nums1.length + nums2.length + 1) / 2);

    let left = 0;
    let right = nums1.length;

    while(left <= right) {

        // middle of nums1
        const mid1 = left + Math.floor((right - left) / 2);

        // middle of nums2
        const mid2 = leftHalfSize - mid1;

        const l1 = mid1 - 1 >= 0 ? nums1[mid1 - 1] : -Infinity;
        const r1 = mid1 < nums1.length ? nums1[mid1] : Infinity;

        const l2 = mid2 - 1 >= 0 ? nums2[mid2 - 1] : -Infinity;
        const r2 = mid2 < nums2.length? nums2[mid2] : Infinity;

        // Correct partition
        if(
            l1 <= r2 &&
            l2 <= r1
        ) {
             if(combinedLength % 2 === 0) {
                return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
             } else {
                return Math.max(l1, l2);
             }
        } 
        // 
        else if(l1 > r2) {
            // we want to shift mid1 to the left (these are tricky)
            right = mid1 - 1;
        } else if(l2 > r1) {
            // we want to shift mid1 to the right (these are tricky)
            left = mid1 + 1;
        }

    }

    // not necessary, return should happen in the loop
    return -Infinity;
    
};