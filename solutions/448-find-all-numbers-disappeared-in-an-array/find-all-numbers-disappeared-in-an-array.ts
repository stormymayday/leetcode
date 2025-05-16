function findDisappearedNumbers(nums: number[]): number[] {
    
    // Marking existing numbers as negative
    for(const num of nums) {
        // Get index of the current number
        const index = Math.abs(num) - 1;

        // Mark number at that index as negative
        nums[index] = -Math.abs(nums[index]);
    }

    const result = [];
    for(let i = 0; i < nums.length; i++) {
        // If the number (at this index) is positive, it was not 'makred'
        // Therefore, it is missing 
        // the actual number is index + 1
        if(nums[i] > 0) {
            result.push(i + 1);
        }
    }

    return result;

};