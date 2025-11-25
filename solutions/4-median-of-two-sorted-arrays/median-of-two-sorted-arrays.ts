function findMedianSortedArrays(nums1: number[], nums2: number[]): number {

    const combinedLength = nums1.length + nums2.length;

    let midIdx1 = Math.floor(combinedLength / 2) - 1;
    let midIdx2 = Math.floor(combinedLength / 2);

    let midIdx1Val = -1;
    let midIdx2Val = -1;

    let p1 = 0;
    let p2 = 0;

    let count = 0;
    while (p1 < nums1.length && p2 < nums2.length) {

        // element in nums1 is smaller
        if (nums1[p1] < nums2[p2]) {
            if (count === midIdx1) {
                midIdx1Val = nums1[p1];
            }
            if (count === midIdx2) {
                midIdx2Val = nums1[p1];
                // can break if midIdx2Val has been assigned?
                // break;
            }
            count += 1;
            p1 += 1;
        }
        // element in nums2 is smaller or they are equal
        else {
            if (count === midIdx1) {
                midIdx1Val = nums2[p2];
            }
            if (count === midIdx2) {
                midIdx2Val = nums2[p2];
                // can break if midIdx2Val has been assigned?
                // break;
            }
            count += 1;
            p2 += 1;
        }
    }

    while (p1 < nums1.length) {
        if (count === midIdx1) {
            midIdx1Val = nums1[p1];
        }
        if (count === midIdx2) {
            midIdx2Val = nums1[p1];
            // can break if midIdx2Val has been assigned?
            // break;
        }
        count += 1;
        p1 += 1;
    }

    while (p2 < nums2.length) {
        if (count === midIdx1) {
            midIdx1Val = nums2[p2];
        }
        if (count === midIdx2) {
            midIdx2Val = nums2[p2];
            // can break if midIdx2Val has been assigned?
            // break;
        }
        count += 1;
        p2 += 1;
    }

    if (combinedLength % 2 === 0) {
        return (midIdx1Val + midIdx2Val) / 2;
    } else {
        return midIdx2Val;
    }

};