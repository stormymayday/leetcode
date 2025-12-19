function removeDuplicates(nums: number[]): number {

    let i = 0;

    for(let j = 1; j < nums.length; j += 1) {

        if(nums[i] !== nums[j]) {

            nums[i + 1] = nums[j];
            i += 1;

        }

    }

    return i + 1;
    
};