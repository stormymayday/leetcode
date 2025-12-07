function rearrangeArray(nums: number[]): number[] {
    const positives = [];
    const negatives = [];
    for (let i = 0; i < nums.length; i += 1) {
        if (nums[i] < 0) {
            negatives.push(nums[i]);
        } else {
            positives.push(nums[i]);
        }
    }
    let p1 = 0;
    let p2 = 0;
    let idx = 0;
    // while (p1 < positives.length && p2 < negatives.length) {
    //     nums[idx] = positives[p1];
    //     p1 += 1;
    //     idx += 1;
    //     nums[idx] = negatives[p2];
    //     p2 += 1;
    //     idx += 1;
    // }
    while (p1 < positives.length && p2 < negatives.length) {
        if (p1 === p2) {
            nums[idx] = positives[p1];
            p1 += 1;
            idx += 1;
        } else {
            nums[idx] = negatives[p2];
            p2 += 1;
            idx += 1;
        }
    }
    nums[idx] = negatives[p2];
    return nums;
};