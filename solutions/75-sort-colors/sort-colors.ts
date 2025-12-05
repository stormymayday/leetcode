/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
    let numZeroes = 0;
    let numOnes = 0;
    let numTwos = 0;
    for(let i = 0; i < nums.length; i += 1) {
        if(nums[i] === 0) {
            numZeroes += 1;
        }
        if(nums[i] === 1) {
            numOnes += 1;
        }
        if(nums[i] === 2) {
            numTwos += 1;
        }
    }
    let idx = 0;
    while(numZeroes > 0) {
        nums[idx] = 0;
        numZeroes -= 1;
        idx += 1;
    }
    while(numOnes > 0) {
        nums[idx] = 1;
        numOnes -= 1;
        idx += 1;
    }
    while(numTwos > 0) {
        nums[idx] = 2;
        numTwos -= 1;
        idx += 1;
    }
};