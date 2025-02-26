/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    const zeroes = [];
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === 0) {
            // delete zero
            nums.splice(i, 1);
            // decrement i?
            i--;
            // push '0' to the zeros array
            zeroes.push(0);
        }
    }
    // concat does not work because it returns a new array
    // therefore, push zeroes to the nums array
    nums.push(...zeroes);
};