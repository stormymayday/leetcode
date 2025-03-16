function majorityElement(nums: number[]): number {
    // Variable to store the final result (the majority element)
    let result = 0;
    // Track the maximum frequency seen so far
    let max = 0;

    // Create a hashmap to count occurrences of each number
    const hashMap = {};
    
    // Count frequencies and track the majority element simultaneously
    for(const num of nums) {
        // If this is the first time we've seen this number, initialize its count to 1
        if(hashMap[num] === undefined) {
            hashMap[num] = 1;
        } else {
            // Otherwise, increment its count
            hashMap[num]++;
        }

        // Update majority element if this number now has the highest frequency
        if(hashMap[num] > max) {
            result = num;
            max = hashMap[num];
        }
    }

    return result;
};