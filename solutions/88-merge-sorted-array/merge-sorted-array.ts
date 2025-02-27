/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {

    // since indicies start at 0
    let ptr1 = m - 1;
    let ptr2 = n - 1;

    let last = nums1.length - 1;

    while(ptr1 >= 0 && ptr2 >= 0) {
        if(nums1[ptr1] > nums2[ptr2]) {
            nums1[last] = nums1[ptr1];
            ptr1--;
        } else {
            nums1[last] = nums2[ptr2];
            ptr2--;
        }
        last--;
    }

    while(ptr2 >= 0) {
        nums1[last] = nums2[ptr2];
        ptr2--;
        last--;
    }
    
};