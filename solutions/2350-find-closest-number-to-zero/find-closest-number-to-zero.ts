function findClosestNumber(nums: number[]): number { 
    // Initializes 'closest' to the first element in the array. Array is guaranteed to have atleast 1 element
    let closest = nums[0]; 
    
    // Loop through each number in the 'nums' array.
    for (const num of nums) { 
        // Check if the absolute value of the current number ('num') is smaller than the absolute value of 'closest'.
        if (Math.abs(num) < Math.abs(closest)) { 
             // If true, update 'closest' to the current number ('num') because it's closer to zero.
            closest = num; 
        }
    }

    // After the loop, if 'closest' is negative, check if the positive counterpart of 'closest' exists in the array.
    if (closest < 0 && nums.includes(Math.abs(closest))) { 
        // If a positive counterpart exists, return the absolute value of 'closest' (i.e., the positive number).
        return Math.abs(closest); 
    } else { 
        // If 'closest' is already positive, or no counterpart was found, return 'closest' as is.
        return closest; 
    }
}