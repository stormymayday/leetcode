function removeElement(nums: number[], val: number): number {
    let i = 0;
    for (let j = 0; j < nums.length; j += 1) {

        if (nums[i] === val && nums[j] !== val) {
            nums[i] = nums[j];
            nums[j] = val;
            i += 1;
        } else if(nums[i] === val && nums[j] === val) {
            continue;
        } else {
            i += 1;
        }

    }
    return i;
};