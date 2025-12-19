function removeElement(nums: number[], val: number): number {

    let length = nums.length;

    let i = 0;
    while(i < length) {

        while(i < length && nums[i] === val) {

            for(let j = i; j < length - 1; j += 1) {

                nums[j] = nums[j + 1];

            }

            length -= 1;

        }

        i += 1;

    }

    return length;
    
};