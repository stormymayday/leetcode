function sortArray(nums: number[]): number[] {
    if(nums.length <= 1) {
        return nums;
    }

    const mid = Math.floor(nums.length/2);
    const leftSorted = sortArray(nums.slice(0, mid));
    const rightSorted = sortArray(nums.slice(mid));

    return merge(leftSorted, rightSorted);
};

function merge(nums1, nums2) {
    const merged = [];
    let p1 = 0;
    let p2 = 0;
    while(p1 < nums1.length && p2 < nums2.length) {
        if(nums1[p1] < nums2[p2]) {
            merged.push(nums1[p1]);
            p1 += 1;
        } else {
            merged.push(nums2[p2]);
            p2 += 1;
        }
    }
    while(p1 < nums1.length) {
        merged.push(nums1[p1]);
        p1 += 1;
    }
    while(p2 < nums2.length) {
        merged.push(nums2[p2]);
        p2 += 1;
    }
    return merged;
}