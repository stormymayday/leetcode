function removeElement(nums: number[], val: number): number {
    
    let left = 0;
    for(let right = 0; right < nums.length; right += 1) {

        if(nums[left] === val && nums[right] !== val) {
            nums[left] = nums[right];
            nums[right] = val;
            left += 1;
        } else if(nums[left] === val && nums[right] === val) {
            continue;
        } else {
            left += 1;
        }

    }

    return left;

};