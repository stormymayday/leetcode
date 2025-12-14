/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let idx2 = 0;
    for (let i = m; i < nums1.length; i += 1) {
        nums1[i] = nums2[idx2];
        idx2 += 1;
    }

    nums1.sort((a, b) => a - b);
};