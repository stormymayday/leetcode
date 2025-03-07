function summaryRanges(nums: number[]): string[] {
    // Initialize an array to store our range summaries
    const result: string[] = [];

    // Edge Case: empty array
    if (nums.length === 0) {
        // early exit
        return result;
    }
    
    // left pointer marks the start of the current range
    let left = 0;
    
    // gap flag indicates whether we're processing a consecutive range (more than one number)
    let gap = false;
    
    // right pointer iterates through the array
    for (let right = 0; right < nums.length; right++) {
        // Check if the current number and next number are consecutive
        if (
            // Make sure next element exists
            nums[right + 1] !== undefined &&
             // Check if they're consecutive 
            nums[right] === nums[right + 1] - 1
        ) {
            // We found consecutive numbers, so mark that this is a range
            // The right pointer keeps moving, but we don't update left
            // as it needs to remain at the start of the range
            gap = true;
        } else {
            // We've reached the end of a consecutive sequence or standalone number
            
            // If gap is false, this is a standalone number (no consecutive sequence)
            if (!gap) {
                // Format as a single number
                result.push(`${nums[left]}`); 
            } else {
                // We have a consecutive range, format as "start->end"
                result.push(`${nums[left]}->${nums[right]}`);
            }
            
            // Move the left pointer to the start of the next potential range
            left = right + 1;
            
            // Reset the gap flag for the next range
            gap = false;
        }
    }
    
    return result;
}