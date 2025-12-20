function findDisappearedNumbers(nums: number[]): number[] {

    // Phase 1: Negative Marking
    for(let i = 0; i < nums.length; i += 1) {

        // We know that the number are in range [1, n]
        // Therefore, we can 'map' every number to index = number - 1

        const curr = Math.abs(nums[i]); // Important: Take absolute value first!
        // As it could have been made negative in prior iteration!

        // Mark value at the target index as negative
        nums[curr - 1] = Math.abs(nums[curr - 1]) * -1;

    }

    // Phase 2: Scan the array and check for positive numbers
    const res: number[] = [];
    for(let i = 0; i < nums.length; i += 1) {

        // If number is positive, value at this index is 'missing'
        if(nums[i] > 0) {
            res.push(i + 1);
        }

    }
    return res;

};