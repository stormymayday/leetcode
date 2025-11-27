function findMedianSortedArrays(nums1: number[], nums2: number[]): number {

    if(nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const totalLength = nums1.length + nums2.length;
    const leftHalfSize = Math.floor((totalLength + 1) / 2);

    let left = 0;
    let right = nums1.length;

    // guaranteed to find median
    while(left <= right) {

        const mid1 = left + Math.floor((right - left) / 2);
        const mid2 = leftHalfSize - mid1;

        const l1 = mid1 - 1 >= 0 ? nums1[mid1 - 1] : - Infinity;
        const r1 = mid1 < nums1.length ? nums1[mid1] : Infinity;

        const l2 = mid2 - 1 >= 0 ? nums2[mid2 - 1] : -Infinity;
        const r2 = mid2 < nums2.length ? nums2[mid2] : Infinity;

        // correct partition
        if(
            l1 <= r2 &&
            l2 <= r1
        ) {
            // if total length is even
            if(totalLength % 2 === 0) {
                return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
            } else {
                return Math.max(l1, l2);
            }
        } 
        // try decreasing the mid1
        else if(l1 > r2) {
            right = mid1 - 1;
        } 
        // try increasing the mid1
        else if(l2 > r1) {
            left = mid1 + 1;
        }

    }

    // not necessary
    // perhaps if arrays are empty?
    return -Infinity;
    
};