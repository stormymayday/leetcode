function intersect(nums1: number[], nums2: number[]): number[] {

    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    const res: number[] = [];

    let p1 = 0;
    let p2 = 0;

    while(p1 < nums1.length && p2 < nums2.length) {

        if(nums1[p1] === nums2[p2]) {
            res.push(nums1[p1]);
            p1 += 1;
            p2 += 1;
        } else if(nums1[p1] < nums2[p2]) {
            p1 += 1;
        } else {
            p2 += 1;
        }

    }

    return res;

};