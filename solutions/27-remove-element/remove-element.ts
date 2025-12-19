function removeElement(nums: number[], val: number): number {

    let length = nums.length;

    for(let i = nums.length - 1; i >= 0; i -= 1) {

        if(nums[i] === val) {

            for(let j = i; j < length - 1; j += 1) {
                nums[j] = nums[j + 1];
            }

            length -= 1;

        }

    }


    return length;
    
};