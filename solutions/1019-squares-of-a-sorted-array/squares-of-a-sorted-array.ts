function sortedSquares(nums: number[]): number[] {
    const res = [];

    let p1 = 0;
    let p2 = nums.length - 1;

    // Important: Last check must be inclusive
    // Otherwise, the 'middle' element will be skipped
    while (p1 <= p2) {

        if ((nums[p1] * nums[p1]) > (nums[p2] * nums[p2])) {
            res.push((nums[p1] * nums[p1]));
            p1 += 1;
        } else {
            res.push((nums[p2] * nums[p2]));
            p2 -= 1;
        }

    }

    return res.reverse();
};