function check(nums: number[]): boolean {

    if(nums.length === 1) {
        return true;
    }
    
    const concatinedNums: number[] = nums.concat(nums);

    let left = 0;
    for(let right = 0; right < concatinedNums.length; right += 1) {

        if(concatinedNums[right] < concatinedNums[right - 1]) {
            left = right;
        }

        // if(right + 1 < concatinedNums.length && concatinedNums[right] > concatinedNums[right + 1]) {
        //     left = right + 1;
        // }

        // while(left < right && concatinedNums[left] > concatinedNums[right]) {
        //     left += 1;
        // }

        if(right - left + 1 === nums.length) {
            return true;
        }

    }

    return false;

};