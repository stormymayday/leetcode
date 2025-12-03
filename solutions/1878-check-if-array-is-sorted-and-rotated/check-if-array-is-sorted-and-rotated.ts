function check(nums: number[]): boolean {

    if(nums.length === 1) {
        return true;
    }
    
    const concatenatedNums: number[] = nums.concat(nums);

    let left = 0;
    // Be careful, start right from 1 otherwise it will look out of bounds on first iteration!
    for(let right = 1; right < concatenatedNums.length; right += 1) {

        // Look back
        if(concatenatedNums[right] < concatenatedNums[right - 1]) {
            left = right;
        }

        if(right - left + 1 === nums.length) {
            return true;
        }

    }

    return false;

};