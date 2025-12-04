/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {

    const nonZeroes: number[] = [];
    for(let i = 0; i < nums.length; i += 1) {
        if(nums[i] !== 0) {
            nonZeroes.push(nums[i]);
            nums[i] = 0;
        }
    }
    for(let i = 0; i < nonZeroes.length; i += 1) {
        nums[i] = nonZeroes[i];
    }
    
};