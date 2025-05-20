function removeElement(nums: number[], val: number): number {

    let i = 0;
    let j = 0;
    while(j < nums.length) {
        
        if(nums[j] !== val) {
            const temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;

            i++;
        }

        j++;

    }

    return i;
    
};