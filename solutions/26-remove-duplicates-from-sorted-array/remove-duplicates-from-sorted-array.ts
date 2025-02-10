function removeDuplicates(nums: number[]): number {
    
    let i = 0;

    for (let j = 1; j < nums.length; j++) {
        
        if(nums[i] === nums[j]) {
            nums.splice(j, 1);
            j--;
        } else {
            i = j;
        }

    }

    return nums.length;
}