/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {

    if(k === nums.length || k === 0) {
        return;
    }

    k = k % nums.length;

    // k elements from the from the end
    const slice1 = nums.slice(nums.length - k);
    // from start up until length - l
    const slice2 = nums.slice(0, nums.length - k);

    const rightRotated = [...slice1, ...slice2];

    for(let i = 0; i < nums.length; i += 1) {
        nums[i] = rightRotated[i];
    }
    
};