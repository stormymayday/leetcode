function majorityElement(nums: number[]): number {
    // Variable to store the final result (the majority element)
    let result = 0;

    // Create a hashmap to count occurrences of each number
    const hashMap = {};
    
    // First pass: Count the frequency of each number in the array
    for(const num of nums) {
        // If this is the first time we've seen this number, initialize its count to 1
        if(hashMap[num] === undefined) {
            hashMap[num] = 1;
        } else {
            // Otherwise, increment its count
            hashMap[num]++;
        }
    }

    // Track the maximum frequency seen so far
    let max = 0;
    
    // Second pass: Find the number with the highest frequency
    for(const key in hashMap) {
        if(hashMap[key] > max) {
            // Convert string key back to number when updating result
            result = Number(key);
            // Update the maximum count
            max = hashMap[key];
        }
    }

    // Return the number with the highest frequency
    return result;
};