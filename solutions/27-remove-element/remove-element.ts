function removeElement(nums: number[], val: number): number {

    // 'i' will track the position where we place the next non-'val' element
    let i = 0;

    // 'j' iterates through every element in the array
    let j = 0;

    while(j < nums.length) {
        
        // If the current element is not the value we want to remove,
        // we copy it to the position 'i' and increment 'i'
        if(nums[j] !== val) {
            // Swap nums[i] and nums[j]
            const temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;

            // Move the 'i' pointer forward because we just placed a valid element at 'i'
            i++;
        }

        // Always move 'j' forward to examine the next element
        j++;

    }
    
    // After the loop ends, 'i' will represent the length of the array without 'val' elements
    return i;
    
};