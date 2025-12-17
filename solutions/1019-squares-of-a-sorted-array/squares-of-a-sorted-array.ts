function sortedSquares(nums: number[]): number[] {
    const res = [];

    let mid = 0;
    // Intuition: try to find zero or smallest number closest to zero
    // could be pointing out of bounds if all numbers are negative
    while (nums[mid] < 0) {
        mid += 1;
    }

    // Starting to the left of mid and going to towards the start
    let p1 = mid - 1;
    // Starting at mid and going towards the end
    let p2 = mid;

    // During each iteration we pick smallest square
    // Push it to the res
    // And advance one of the pointers
    while (p1 >= 0 && p2 < nums.length) {

        if ((nums[p1] * nums[p1]) < (nums[p2] * nums[p2])) {
            res.push((nums[p1] * nums[p1]));
            p1 -= 1;
        } else {
            res.push((nums[p2] * nums[p2]));
            p2 += 1;
        }

    }

    // If p1 has not reached index 0
    while (p1 >= 0) {
        res.push((nums[p1] * nums[p1]));
        p1 -= 1;
    }
    // If p1 has not reached last index
    while (p2 < nums.length) {
        res.push((nums[p2] * nums[p2]));
        p2 += 1;
    }

    return res;
};