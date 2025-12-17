function sortedSquares(nums: number[]): number[] {
    const res = [];

    let mid = 0;
    while (nums[mid] < 0) {
        mid += 1;
    }

    let p1 = mid - 1;
    let p2 = mid;

    while (p1 >= 0 && p2 < nums.length) {

        if ((nums[p1] * nums[p1]) < (nums[p2] * nums[p2])) {
            res.push((nums[p1] * nums[p1]));
            p1 -= 1;
        } else {
            res.push((nums[p2] * nums[p2]));
            p2 += 1;
        }

    }

    while (p1 >= 0) {
        res.push((nums[p1] * nums[p1]));
        p1 -= 1;
    }

    while (p2 < nums.length) {
        res.push((nums[p2] * nums[p2]));
        p2 += 1;
    }

    return res;
};