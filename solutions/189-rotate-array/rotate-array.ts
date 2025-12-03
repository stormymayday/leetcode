/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    if (k === nums.length || k === 0) {
        return;
    }

    k = k % nums.length;

    const slice1 = nums.slice(0, nums.length - k);
    const slice2 = nums.slice(nums.length - k);
    const rotated = [...slice2, ...slice1];

    for (let i = 0; i < nums.length; i += 1) {
        nums[i] = rotated[i];
    }
};