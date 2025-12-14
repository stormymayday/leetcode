/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    const temp = [];

    let p1 = 0;
    let p2 = 0;
    while (p1 < m && p2 < n) {
        if (nums1[p1] < nums2[p2]) {
            temp.push(nums1[p1]);
            p1 += 1;
        } else {
            temp.push(nums2[p2]);
            p2 += 1;
        }
    }

    while (p1 < m) {
        temp.push(nums1[p1]);
        p1 += 1;
    }

    while (p2 < n) {
        temp.push(nums2[p2]);
        p2 += 1;
    }

    for(let i = 0; i < temp.length; i += 1) {
        nums1[i] = temp[i];
    }
};