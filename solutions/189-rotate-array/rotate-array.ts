/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {

    if(k === 0 || k === nums.length || nums.length === 1) {
        return;
    }

    k = k % nums.length;

    const temp: number[] = [];

    // First copy last k elements
    for(let i = nums.length - k; i < nums.length; i += 1) {
        temp.push(nums[i]);
    }

    // Next copy all elements up to last k
    for(let i = 0; i < nums.length - k; i += 1) {
        temp.push(nums[i]);
    }

    // Finaly, overwrite the original with temp
    for(let i = 0; i < nums.length; i += 1) {
        nums[i] = temp[i];
    }
    
};