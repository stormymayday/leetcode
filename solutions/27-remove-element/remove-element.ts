function removeElement(nums: number[], val: number): number {
    
    let length = nums.length;

    for(let i = nums.length - 1; i >= 0; i -= 1) {

        if(nums[i] === val) {

            for(let j = i + 1; j < length; j += 1) {

                nums[j - 1] = nums[j];

            }

            length -= 1;
        }

    }

    return length;

};