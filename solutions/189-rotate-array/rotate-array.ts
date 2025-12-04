/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {

    const n = nums.length;

    if(k === n || k === 0) {
        return;
    }

    k = k % n;
    
    const rotated: number[] = new Array(nums.length);

    for(let i = 0; i < n; i += 1) {
        rotated[(i + k) % n] = nums[i];
    }

    for(let i = 0; i < n; i += 1) {
        nums[i] = rotated[i];
    }

};