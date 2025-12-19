function removeDuplicates(nums: number[]): number {

    let length = nums.length;

    // Going Backwards
    for(let i = nums.length - 2; i >= 0; i -= 1) {

        // 'curr' and 'prev' are duplicates
        if(nums[i] === nums[i + 1]) {

            for(let j = i + 1; j < length; j += 1) {

                nums[j - 1] = nums[j];

            }

            length -= 1;
        }


    }

    return length;
    
};