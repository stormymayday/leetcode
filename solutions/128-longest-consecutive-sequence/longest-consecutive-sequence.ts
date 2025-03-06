function longestConsecutive(nums: number[]): number {
    // Return 0 if input array is empty
    if (nums.length === 0) {
        return 0;
    }
    
    // Initialize variable to keep track of the longest streak found
    let longestStreak = 0;
    
    // Create a Set from the input array for O(1) lookups
    const hashSet = new Set(nums);
    
    // Iterate through each number in the Set (input array times out)
    for(const num of hashSet) {
        // Check if this number is the start of a sequence by checking
        // if the number before it doesn't exist in our set
        if(!hashSet.has(num - 1)) {
            // Set current number to start counting from
            let currentNum = num;
            
            // Initialize counter for the current streak
            let currentStreak = 0;
            
            // Keep incrementing and counting as long as consecutive numbers exist
            while(hashSet.has(currentNum)) {
                currentStreak++;
                currentNum++;
            }
            
            // Update result with the maximum streak found so far
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }
    
    // Return the length of the longest consecutive sequence
    return longestStreak;
}