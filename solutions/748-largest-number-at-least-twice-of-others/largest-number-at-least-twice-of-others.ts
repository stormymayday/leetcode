function dominantIndex(nums: number[]): number {

    let max = -Infinity;
    let maxIdx = -1;

    // First Pass: find max
    for(let i = 0; i < nums.length; i += 1) {
        if(nums[i] > max) {
            max = nums[i];
            maxIdx = i;
        }
    }

    // Second Pass: check if max is 'dominant'
    for(let i = 0; i < nums.length; i += 1) {

        if(i !== maxIdx && nums[maxIdx] < nums[i] * 2) {
            maxIdx = -1;
            break;
        }

    }

    return maxIdx;
    
};