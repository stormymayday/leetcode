function removeDuplicates(nums: number[]): number {

    if(!nums.length) {
        return 0;
    }
    
    let i = 0;

    for(let j = 1; j < nums.length; j++) {

        if(nums[i] === nums[j]) {
            // duplucate
            
            // keep i where it is

            // move j forward
        } else {
            // not a duplicate

            // move i one step forward
            i++;

            // replace the value
            nums[i] = nums[j];
        }

    }

    return i + 1;

};