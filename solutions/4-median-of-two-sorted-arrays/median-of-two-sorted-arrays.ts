function findMedianSortedArrays(nums1: number[], nums2: number[]): number {

    // Will want to run Binary Search on a smaller array
    // Therefore, let's make sure 'nums1' is the smaller array
    if(nums1.length > nums2.length) {
        // don't forget the 'return'
        return findMedianSortedArrays(nums2, nums1);
    }

    // Now 'nums1' should be smaller

    const combinedLength: number = nums1.length + nums2.length;

    // adding + 1 to keep the formula same for both odd and even lengths
    // for odd lengths, this will have 1 more element
    const leftHalfSize = Math.floor((combinedLength + 1) / 2);

    let left: number = 0;
    let right: number = nums1.length; // not - 1?

    // perhaps this condition does not make sense / not necessary?
    // What happens when pointers cross?
    while (left <= right) {

        // middle of the smaller array (nums1)
        const mid1 = left + Math.floor((right - left) / 2);

        // middle of the larget array (nums2)
        const mid2 = leftHalfSize - mid1; // not sure about this, seems correct

        // 'l1' is to the left of 'mid1' can be out of bounds
        const l1 = mid1 - 1 >= 0 ? nums1[mid1 - 1] : -Infinity;
        const r1 = mid1 < nums1.length ? nums1[mid1] : Infinity;
        
        // Apparantly, these can get out of bounds as well
        const l2 = mid2 - 1 >= 0 ? nums2[mid2 - 1] : -Infinity;
        const r2 = mid2 < nums2.length ? nums2[mid2] : Infinity;

        // This is the correct partition
        // Everything on the left is smaller than everything on the right
        if(
            l1 <= r2 &&
            l2 <= r1
        ) {
            // If the length is even
            if(combinedLength % 2 === 0) {
                // (max between l1 & l2 + min between r1 & r2) / 2
                return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
            } 
            // the length is odd
            else {
                // return the max between l1 & l2
                return Math.max(l1, l2);
            }
        } 
        // Incorrect Parition
        // l1 > r2
        else if(l1 > r2) {
            // we need to 'shift' to the left
            right = mid1 - 1;
        }
        // Incorrect Partition
        // l2 > r1
        else if(l2 > r1) {
            // we need to 'shift' to the right
            left = mid1 + 1;
        }

    }

};


