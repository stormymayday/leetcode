/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    
    if(k === nums.length || k === 0) {
        return;
    }

    k = k % nums.length;

    // Storing last k elements
    const temp: number[] = [];
    for(let i = nums.length - k; i < nums.length; i += 1) {
        temp.push(nums[i]);
    }

    // Shifting first length - k number of elements k steps forward
    for(let i = nums.length - 1; i >= k; i -= 1) {
        nums[i] = nums[i - k];
    }

    // Placing temp at the beginning
    for(let i = 0; i < temp.length; i += 1) {
        nums[i] = temp[i];
    }

};