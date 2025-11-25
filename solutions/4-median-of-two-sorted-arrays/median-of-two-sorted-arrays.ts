function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    
    const nums3: number[] = [];

    let p1 = 0;
    let p2 = 0;

    while(p1 < nums1.length && p2 < nums2.length) {

        // nums1 has the smaller element
        if(nums1[p1] < nums2[p2]) {
            nums3.push(nums1[p1]);
            p1 += 1;
        } 
        // nums2 has the smaller element
        else if(nums1[p1] > nums2[p2]) {
            nums3.push(nums2[p2]);
            p2 += 1;
        } 
        // there are equal
        else {
            nums3.push(nums1[p1]);
            nums3.push(nums2[p2]);
            p1 += 1;
            p2 += 1;
        }

    }

    // If there are elements left in nums1
    while(p1 < nums1.length) {
        nums3.push(nums1[p1]);
        p1 += 1;
    }

    // If there are elements keft in nums2
    while(p2 < nums2.length) {
        nums3.push(nums2[p2]);
        p2 += 1;
    }

    // Even number of elements
    if(nums3.length % 2 === 0) {
        // average of two middle elements
        return (nums3[nums3.length / 2 - 1] + nums3[nums3.length / 2]) / 2;
    } 
    // Odd number of elements
    else {
        return nums3[Math.floor(nums3.length / 2)];
    }

};