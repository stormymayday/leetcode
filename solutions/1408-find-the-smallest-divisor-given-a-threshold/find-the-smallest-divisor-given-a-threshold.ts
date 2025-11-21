function smallestDivisor(nums: number[], threshold: number): number {

    let left = 1;
    let right = Math.max(...nums);
    let candidate = 1;

    while (left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        const sum = nums.reduce((acc, num) => acc + Math.ceil(num / mid), 0);

        if (sum > threshold) {
            left = mid + 1;
        } else {
            candidate = mid;
            right = mid - 1;
        }

    }

    return candidate;

};