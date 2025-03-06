function findClosestNumber(nums: number[]): number {
    // Initializes 'closest' to the first element in the array. Array is guaranteed to have atleast 1 element
    let closest = nums[0]; 
    
    // Loop through each number in the 'nums' array.
    for (const num of nums) { 
        
        // Check if the absolute value of the current number ('num') is smaller than the absolute value of 'closest'.
        // OR if both numbers have the same absolute value, the positive one (the one with a larger actual value) is preferred.
        if (Math.abs(num) < Math.abs(closest) || 
            (Math.abs(num) === Math.abs(closest) && num > closest)) { 
            // If any of the above conditions is true, update 'closest' to the current number ('num').
            closest = num; 
        }
    }
    // After the loop, return 'closest', which now holds the number closest to zero. 
    return closest; 
    
}
