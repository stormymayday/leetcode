/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {

    const n = nums.length;

    k = k % n;

    if (
        // n cannot be equal k after normalization (k = k % n)
        // n === k ||
        n === 1 ||
        k === 0
    ) {
        return;
    }

    const rotated: number[] = new Array(n);

    for (let i = 0; i < n; i += 1) {
        rotated[(i + k) % n] = nums[i];
    }

    for (let i = 0; i < n; i += 1) {
        nums[i] = rotated[i];
    }

};