function removeDuplicates(nums: number[]): number {

    if(!nums.length) {
        return 0;
    }

    let i = 0;

    for(let j = 1; j < nums.length; j++) {

        if(nums[i] === nums[j]) {

            // do nothing
            // j moves forward

        } else {

            // move i one step forward
            i++;

            // replace value at i with value at j
            nums[i] = nums[j];

        }

    }

    return i + 1;
    
};